<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <h1>Réinitialiser le mot de passe</h1>
        <form
          ref="reset_form"
          class="row g-3 login-form"
          @submit.prevent="submitForm"
        >
          <div class="form-floating mb-4">
            <input
              type="text"
              placeholder="password"
              v-model="state.password"
              class="form-control" required
            />
            <label class="form-label" for="password">Mot de passe</label>
            <span class="text-danger" v-if="v$.password.$error">{{
              v$.password.$errors[0].$message
            }}</span>
          </div>
          <div class="form-floating mb-4">
            <input
              type="text"
              placeholder="password"
              v-model="state.confirmPassword"
              class="form-control" required
            />
            <label class="form-label" for="confirmPassword"
              >Confirmez le mot de passe</label
            >
            <span class="text-danger" v-if="v$.confirmPassword.$error">{{
              v$.confirmPassword.$errors[0].$message
            }}</span>
          </div>
          <button type="submit" class="btn btn-block mb-4 btn-rounded">
            Valider
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, minLength, sameAs } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axiosClient from "@/axios";
export default {
  name: "ResetPassword",
  setup() {
    const state = reactive({
      password: "",
      confirmPassword: "",
    });
    const rules = computed(() => {
      return {
        password: {
          required,
          minLength: minLength(6),
          sameAs: sameAs(state.password),
        },
        confirmPassword: { required, sameAsPassword: sameAs(state.password) },
      };
    });
    const v$ = useValidate(rules, state);
    return { state, v$ };
  },
  methods: {
    submitForm: function (e) {
      e.preventDefault();
      this.v$.$validate();
      const response_validate = Promise.resolve(this.v$.$validate());
      response_validate.then((value) => {
        if (value == true) {
          // let response = axiosClient.post("/auth/reset-password", {
          //   password: this.state.password,
          //   email:this.state.password
          // });
          // const search_email = Promise.resolve(response);
          // search_email.then((value) => {
          //   var type = "";
          //   if (value.data["status"] == 200) {
          //     type = "success";
          //     this.$refs.reset_form.reset();
          //     this.$router.push({ name: "login" });
          //   } else {
          //     type = "error";
          //   }
          //   this.$toast.show(value.data["message"], {
          //     type: type,
          //     position: "top-right",
          //   });
          // });
          console.log(this.$route.params.token);
          console.log(value);
        }
      });
    },
  },
  created() {
    let response = axiosClient.get("/search-token", {
      token: this.$route.params.token,
    });
    const validity_token = Promise.resolve(response);
    validity_token.then((value) => {
      var type = "";
      if (value.data["status"] != 200) {
        this.$toast.show("Jeton expiré", {
          type: type,
          position: "top-right",
        });
      }
    });
  },
};
</script>
<style scoped>
.form-control:focus {
  border-color: transparent;
  box-shadow: none;
}
.form-control{
  border-width:0px;
  border:none;
}
.text-color {
  color: #e9967a;
}
.card {
  margin: auto;
  width: 50%;
  padding: 10px;
  margin-top: 2%;
}
.btn-rounded {
  background-color: #faebd7;
}
</style>
