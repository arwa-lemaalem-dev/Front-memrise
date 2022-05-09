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
              :type="image.type_input"
              id="password"
              placeholder="password"
              class="form-control"
              v-model="state.password"
              required
            />
            <i><img :src="image.src_img" alt="" @click="statePassword" /> </i>
            <label class="form-label" for="password">Mot de passe</label>
            <span class="text-danger" v-if="v$.password.$error">{{
              v$.password.$errors[0].$message
            }}</span>
          </div>
          <div class="form-floating mb-4">
            <input
              :type="image.type_input"
              id="password"
              placeholder="password"
              class="form-control"
              v-model="state.confirmPassword"
              required
            />
            <label class="form-label" for="password"
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
  data() {
    return {
      image: {
        src_img: require("@/assets/images/eye_hidden.png"),
        type: 0,
        type_input: "password",
      },
      email: null,
    };
  },
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
    statePassword() {
      if (this.image.type === 0) {
        this.image.src_img = require("@/assets/images/eye.png");
        this.image.type = 1;
        this.image.type_input = "text";
      } else {
        this.image.src_img = require("@/assets/images/eye_hidden.png");
        this.image.type = 0;
        this.image.type_input = "password";
      }
    },
    submitForm: function (e) {
      e.preventDefault();
      this.v$.$validate();
      const response_validate = Promise.resolve(this.v$.$validate());
      response_validate.then((value) => {
        if (value == true) {
          let formData = new FormData();
          formData.append("password", this.state.password);
          formData.append("email", this.email);
          let response = axiosClient.post("/auth/change-password", formData);
          const reset_pass = Promise.resolve(response);
          reset_pass.then((value) => {
            var type = "";
            if (value.data["status"] == 200) {
              type = "success";
              this.$refs.reset_form.reset();
              this.$router.push({ name: "login" });
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
  mounted() {
    let response = axiosClient.post("/search-token", {
      token: this.$route.params.token,
    });
    const validity_token = Promise.resolve(response);
    validity_token.then((value) => {
      if (value.data["status"] == 200) {
        this.email = value.data["email"];
      } else {
        this.$toast.show(value.data["message"], {
          type: "error",
          position: "top-right",
        });
        this.$router.push({'name':'forgot-password'});
      }
    });
  },
};
</script>
<style scoped>
img {
  width: 6%;
  height: 45%;
  margin-top: -7%;
  margin-right: 1%;
  float: top;
  float: right;
}
.form-control:focus {
  border-color: transparent;
  box-shadow: none;
}
.form-control {
  border-width: 0px;
  border: none;
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
