<template >
  <div class="container">
    <div class="card">
      <div class="card-body">
        <h1>S'inscrire</h1>
        <form
          ref="form_register"
          class="row g-3 login-form"
          @submit="submitForm"
        >
          <div class="form-outline mb-3">
            <label class="form-label" for="fname">Nom</label>
            <input
              type="text"
              v-model="state.fname"
              id="fname"
              class="form-control __input"
              required
            />
            <span class="text-danger" v-if="v$.fname.$error">{{
              v$.fname.$errors[0].$message
            }}</span>
          </div>

          <div class="form-outline mb-4">
            <label class="form-label" for="work_space"
              >Espace de travail (Nom)</label
            >
            <input
              type="text"
              class="form-control __input"
              v-model="state.work_space"
              required
            />
            <span class="text-danger" v-if="v$.work_space.$error">{{
              v$.work_space.$errors[0].$message
            }}</span>
          </div>

          <div class="form-outline mb-4">
            <label class="form-label" for="email">Adresse e-mail</label>
            <input
              type="email"
              v-model="state.email"
              class="form-control __input"
              required
            />
            <span class="text-danger" v-if="v$.email.$error">{{
              v$.email.$errors[0].$message
            }}</span>
          </div>

          <div class="form-outline mb-4">
            <label class="form-label" for="password">Mot de passe</label>
            <input
              :type="image.type_input"
              class="form-control __input"
              v-model="state.password"
              required
            />
            <i><img :src="image.src_img" alt="" @click="statePassword" /> </i>
            <span class="text-danger" v-if="v$.password.$error">{{
              v$.password.$errors[0].$message
            }}</span>
          </div>
          <div class="form-outline mb-4">
            <label class="form-label" for="confirmPassword"
              >Confirmez le mot de passe</label
            >
            <input
              :type="image.type_input"
              class="form-control __input"
              v-model="state.confirmPassword"
              required
            />
            <span class="text-danger" v-if="v$.confirmPassword.$error">{{
              v$.confirmPassword.$errors[0].$message
            }}</span>
          </div>
          <div class="form-outline mb-4">
            <label class="form-label" for="img_profile">Photo de profil</label>
            <input
              type="file"
              class="form-control __input"
              required
              @change="uploadFile"
            />
          </div>
          <button type="submit" class="btn btn-block mb-4 btn-rounded">
            S'identifier
          </button>

          <div class="forgot_password text-color">
            <p class="forgot_password text-color">
              Ou
              <router-link :to="{ name: 'login' }" class="text-color"
                >Se Connecter</router-link
              >
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axiosClient from "@/axios";
import useValidate from "@vuelidate/core";
import { required, email, sameAs, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  name: "RegisterApp",
  props: {},
  data() {
    return {
      img_profile: null,
      image: {
        src_img: require("@/assets/images/eye_hidden.png"),
        type: 0,
        type_input: "password",
      },
    };
  },
  setup() {
    const state = reactive({
      fname: "",
      email: "",
      password: "",
      confirmPassword: "",
      work_space: "",
    });
    const rules = computed(() => {
      return {
        fname: {
          required,
          minLength: minLength(2),
          sameAs: sameAs(state.fname),
        },
        email: { required, email, sameAs: sameAs(state.email) },
        password: { required, sameAs: sameAs(state.password) },
        work_space: {
          required,
          minLength: minLength(2),
          sameAs: sameAs(state.work_space),
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
    uploadFile(event) {
      this.img_profile = event.target.files[0];
      console.log(this.img_profile, event.target.files[0]);
    },
    submitForm: function (e) {
      e.preventDefault();
      const promise1 = Promise.resolve(this.v$.$validate());
      promise1.then((value) => {
        if (value == true) {
          let formData = new FormData();
          formData.append("img_profile", this.img_profile);
          formData.append("password", this.state.password);
          formData.append("email", this.state.email);
          formData.append("name", this.state.fname);
          formData.append("work_space", this.state.work_space);
          let res = axiosClient.post("auth/register", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              charset: "utf-8",
              boundary: Math.random().toString().substr(2),
            },
          });
          const promise_res = Promise.resolve(res);
          promise_res.then((value_res) => {
            console.log(value_res);
            var type = "";
            if (value_res.data["status"] == 200) {
              type = "success";
              this.$refs.form_register.reset();
            } else {
              type = "error";
            }
            this.$toast.show(value_res.data["etat"], {
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
.forgot_password {
  float: right;
  margin: 1.2%;
}
.form-label {
  float: left;
  margin-bottom: -1%;
}
.__input {
  border: none;
  border-bottom: 2px solid #d1d1d4;
  background: none;
  color: #656566;
  transition: 0.2s;
}
input:focus,
select:focus {
  outline: none;
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
  margin: 1.5%;
}
img {
  width: 6%;
  height: 45%;
  margin-top: -8%;
  margin-right: 1%;
  float: top;
  float: right;
}
span {
  float: left;
}
</style>
