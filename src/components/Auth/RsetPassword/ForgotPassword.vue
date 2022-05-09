<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <h1>Mot de passe oublié</h1>
        <form ref="reset_form" class="login-form" @submit.prevent="submitForm">
          <div class="form-floating mb-3">
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              v-model="state.email"
              class="form-control" required
            />
            <label for="email">Adresse e-mail</label>
            <span class="text-danger" v-if="v$.email.$error">{{
              v$.email.$errors[0].$message
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
import { required, email, sameAs } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axiosClient from "@/axios";
export default {
  name: "ForgotPassword",
  setup() {
    const state = reactive({
      email: "",
    });
    const rules = computed(() => {
      return {
        email: { required, email, sameAs: sameAs(state.email) },
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
          let response = axiosClient.post("/auth/search-email", {
            email: this.state.email,
          });
          const search_email = Promise.resolve(response);
          search_email.then((value) => {
            var type = "";
            if (value.data["status"] == 200) {
              type = "success";
              this.$refs.reset_form.reset();
              this.$router.push({name:'login'});
            } else {
              type = "error";
            }
            this.$toast.show(value.data["message"], {
              type: type,
              position: "top-right",
            });
          });
        }
      });
    },
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
