<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <h1>Se Connecter</h1>
        <form ref="form_login" class="login-form" @submit="submitForm">
          <div class="form-floating mb-4">
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              v-model="state.email"
              class="form-control"
              required
            />
            <label for="email">Adresse e-mail</label>
            <span class="text-danger" v-if="v$.email.$error">{{
              v$.email.$errors[0].$message
            }}</span>
          </div>

          <div class="form-floating mb-4">
            <input
              type="password"
              id="password"
              placeholder="password"
              class="form-control"
              v-model="state.password"
              required
            />
            <label class="form-label" for="password">Mot de passe</label>
            <span class="text-danger" v-if="v$.password.$error">{{
              v$.password.$errors[0].$message
            }}</span>
          </div>

          <div class="container forgot_password">
            <router-link
              :to="{ name: 'forgot-password' }"
              class="forgot_password text-color"
              >Mot de passe oublié?
            </router-link>
          </div>

          <button type="submit" class="btn btn-block mb-4 btn-rounded">
            Se Connecter
          </button>

          <div class="container forgot_password">
            <p class="forgot_password text-color">
              Ou
              <router-link :to="{ name: 'register' }" class="text-color"
                >S'inscrire</router-link
              >
            </p>
          </div>
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
  name: "LoginApp",
  setup() {
    const state = reactive({
      email: "",
      password: "",
    });
    const rules = computed(() => {
      return {
        email: { required, email, sameAs: sameAs(state.email) },
        password: { required, sameAs: sameAs(state.password) },
      };
    });
    const v$ = useValidate(rules, state);
    return { state, v$ };
  },
  methods: {
    submitForm: function (e) {
      e.preventDefault();
      this.v$.$validate();
      const promise1 = Promise.resolve(this.v$.$validate());
      promise1.then((value) => {
        if (value == true) {
          this.login();
        }
      });
    },
    login() {
      let login = axiosClient.post("/auth/login", {
        password: this.state.password,
        email: this.state.email,
      });
      const promise_login = Promise.resolve(login);
      promise_login.then((value_login) => {
        var type = "";
        if (value_login.data["status"] == 200) {
          type = "success";
          this.$refs.form_login.reset();
          this.$store.commit("setAuth", value_login.data);
        } else {
          type = "error";
        }
        if (type == "success") {
          this.$router.push({ name: "home" });
        }
        this.$toast.show(value_login.data["etat"], {
          type: type,
          position: "top-right",
        });
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

.forgot_password {
  float: right;
  margin: 1.2%;
}
</style>
