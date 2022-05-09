<template>
  <div class="container">
    <div class="row">
      <div
        class="col-lg-4 col-md-6 col-sm-6 col-12 option-card"
        data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s"
      >
        <div class="features-small-item">
          <div class="icon">
            <i
              ><img
                src="@/assets/images/todo.png"
                alt=""
                width="70%"
                height="70%"
            /></i>
          </div>
          <div class="content-card">
            <h5 class="features-title">Liste de choses à faire</h5>
            <p>Mis à jour à : 20-03-2022</p>
          </div>
        </div>
      </div>
      <div
        class="col-lg-4 col-md-6 col-sm-6 col-12 option-card"
        data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s"
      >
        <div class="features-small-item">
          <div class="icon">
            <i
              ><img
                src="@/assets/images/calendar.png"
                alt=""
                width="70%"
                height="70%"
            /></i>
          </div>
          <div class="content-card">
            <h5 class="features-title">Calendrier</h5>
            <p>Mis à jour à : 20-03-2022</p>
          </div>
        </div>
      </div>
      <div
        class="col-lg-4 col-md-6 col-sm-6 col-12 option-card"
        data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s"
      >
        <div class="features-small-item">
          <div class="icon">
            <i
              ><img
                src="@/assets/images/files.png"
                alt=""
                width="70%"
                height="70%"
            /></i>
          </div>
          <div class="content-card">
            <h5 class="features-title">Fichiers</h5>
            <p>Mis à jour à : 20-03-2022</p>
          </div>
        </div>
      </div>
    </div>
    <button
      class="main-button-slider"
      data-mdb-toggle="modal"
      data-mdb-target="#staticBackdrop"
    >
      Ajouter une application
    </button>
    <div class="table-tache">
      <table class="table table-hover">
        <thead class="bg-light">
          <tr>
            <th>Nom du Project</th>
            <th>Date limite de projet</th>
            <th>Tâche courante</th>
            <th>Statut</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <img
                  src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                  alt=""
                  style="width: 45px; height: 45px"
                  class="rounded-circle"
                />
                <div class="ms-3">
                  <p class="fw-bold mb-1">Bazar</p>
                  <a
                    class="text-muted mb-0"
                    href="http://localhost/p3427_marketplace_for_agricultural_sector/public/admin/"
                    target="_blanck"
                    >lien de l'application</a
                  >
                </div>
              </div>
            </td>
            <td>
              <p class="fw-normal mb-1">2022-05-10</p>
            </td>
            <td>
              <p class="fw-normal mb-1">Gestion des FAQ</p>
            </td>
            <td>
              <span class="badge rounded-pill badge-success">En cours</span>
            </td>
            <td>
              <router-link to="/login"
                ><i class="fa fa-times fa-2x"></i
              ></router-link>
              &emsp;
              <router-link :to="{ name: '' }"
                ><i class="fas fa-check fa-2x"></i
              ></router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- ADD Project -->
    <div
      class="modal fade modal-dialog-scrollable"
      id="staticBackdrop"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Ajouter une application
            </h5>
            <button
              @click="resetForm"
              type="reset"
              class="btn-close"
              data-mdb-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form ref="form_add" class="container">
            <div class="modal-body">
              <div class="__form">
                <input
                  type="text"
                  v-model.trim="add_project.name_project"
                  class="__input"
                  placeholder="Nom du projet" required
                />
                <p
                  v-show="show_alert"
                  class="text-danger"
                  v-if="v$.name_project.$error"
                >
                  {{ v$.name_project.$errors[0].$message }}
                </p>
              </div>
              <div class="__form">
                <input
                  type="text"
                  v-model.trim="add_project.deadline"
                  class="__input"
                  placeholder="Date limite de projet"
                  onfocus="(this.type='date')" required
                />
                <p
                  v-show="show_alert"
                  class="text-danger"
                  v-if="v$.deadline.$error"
                >
                  {{ v$.deadline.$errors[0].$message }}
                </p>
              </div>
            </div>
            <div class="footer row">
              <div class="col">
                <button @click="resetForm">
                  <i
                    class="fa fa-times fa-2x"
                    aria-hidden="true"
                    data-mdb-dismiss="modal"
                    aria-label="Close"
                  ></i>
                </button>
              </div>
              <div class="col">
                <button @click="AddProject">
                  <i class="fas fa-check fa-2x"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, helpers, sameAs } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axiosClient from "@/axios";

export default {
  name: "HomePage",
  data() {
    return {
      show_alert: true,
    };
  },
  setup() {
    const add_project = reactive({
      name_project: null,
      deadline: null,
    });
    const rules = computed(() => {
      return {
        name_project: { required, sameAs: sameAs(add_project.name_project) },
        deadline: {
          required,
          minValue: helpers.withMessage(
            "The deadline must be greater than the current date",
            helpers.withAsync(async (value) => {
              return new Date(value) > new Date();
            })
          ),
          sameAs: sameAs(add_project.deadline),
        },
      };
    });
    const v$ = useValidate(rules, add_project);
    return { add_project, v$ };
  },
  methods: {
    redirect_route() {
      if (this.$store.getters.isLogged == false) {
        this.$router.push({ name: "login" });
      }
    },
    resetForm: function (e) {
      e.preventDefault();
      this.$refs.form_add.reset();
      this.show_alert = false;
    },
    AddProject: function (e) {
      e.preventDefault();
      this.v$.$validate();
      const promise1 = Promise.resolve(this.v$.$validate());
      promise1.then((value) => {
        if (value == true) {
          axiosClient
            .post("/project/create-project", {
              deadline: this.add_project.deadline,
              name_project: this.add_project.name_project,
            })
            .then((response) => {
              if (response.data["status"] == 200) {
                this.resetForm();
                this.$toast.show(response.data["response"], {
                  type: "success",
                  position: "top-right",
                });
              }
            });
        }
      });
    },
  },
  mounted() {
    this.redirect_route();
  },
};
</script>
<style scoped>
@import "../assets/css/bootstrap.min.css";
/* @import '../assets/css/font-awesome.css'; */
/* @import "../assets/css/templatemo-softy-pinko.css"; */
button {
  border: 0px;
  background-color: transparent;
}
.__form {
  padding: 10px 0px;
  position: relative;
  margin-left: -10%;
}
.__input {
  border: none;
  border-bottom: 2px solid #d1d1d4;
  background: none;
  padding: 10px;
  padding-left: 24px;
  color: #656566;
  width: 75%;
  transition: 0.2s;
}

.__input:active,
.__input:focus,
.__input:hover {
  outline: none;
  border-bottom-color: #ffb6c1;
}

.fa-check {
  color: green;
}
.fa-times {
  color: red;
}
.footer .fa-check:hover,
.footer .fa-times:hover {
  color: grey;
}
.footer {
  margin-bottom: 2%;
  float: right;
  margin-right: 4%;
}
.container {
  margin: 0 auto;
  margin-top: 2%;
}
.pink {
  background-color: #fff0f5;
}
.table-tache {
  border-radius: 50% 20% / 10% 40%;
}
.main-button-slider {
  border: 0px;
  text-decoration: none;
  font-size: 13px;
  border-radius: 20px;
  padding: 12px 20px;
  margin-bottom: 10px;
  background-color: #fff0f5;
  color: #000;
  letter-spacing: 0.25px;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  float: right;
}
.option-card:hover .features-small-item .content-card {
  margin-left: 30px;
}
.features-small-item:hover .icon {
  background-color: #dcdcdc;
}
.features-small-item .icon {
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  width: 90px;
  height: 90px;
  line-height: 90px;
  margin: auto;
  position: relative;
  margin-bottom: 30px;
  background: #fff0f5;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}
.features-small-item {
  cursor: pointer;
  display: block;
  background: #ffffff;
  box-shadow: 0 2px 48px 0 rgba(0, 0, 0, 0.1);
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  position: relative;
  margin-bottom: 30px;
}
.badge-success {
  background-color: green;
}
</style>
