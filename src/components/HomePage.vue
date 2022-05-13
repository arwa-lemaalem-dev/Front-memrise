<template>
  <div class="container">
    <div class="row">
      <div
        class="col-lg-4 col-md-6 col-sm-6 col-12 option-card"
        data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s" 
        v-on:click="redirect('to-do-list')"
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
              <h5 class="features-title">Liste des tâches</h5>
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
    <!-- Button for add project -->
    <button
      class="main-button-slider"
      data-mdb-toggle="modal"
      data-mdb-target="#staticBackdrop"
    >
      Ajouter une application
    </button>
    <!-- Table for listing Projects -->
    <div class="table-tache">
      <table class="table table-hover">
        <thead class="bg-light">
          <tr>
            <th>Nom du Project</th>
            <th>Date limite de projet</th>
            <th>Tâche courante</th>
            <th>Statut</th>
            <th>Etat</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="projects.length == 0" scope="row">
            <td colspan="5" class="empty">Empty</td>
          </tr>
          <tr v-else v-for="project in projects" :key="project.id">
            <td>
              <div class="d-flex flex-row">
                <div class="p-2">
                  <img
                    :src="this.$store.getters.urlBackend + project.logo"
                    alt=""
                    style="width: 45px; height: 45px"
                    class="rounded-circle"
                  />
                </div>

                <div class="ms-3 col">
                  <div class="row">
                    <p class="fw-bold mb-1">{{ project.name_project }}</p>
                  </div>
                  <div class="row">
                    <a
                      class="text-muted mb-0"
                      href="http://localhost/p3427_marketplace_for_agricultural_sector/public/admin/"
                      target="_blanck"
                      >{{ project.url }}</a
                    >
                  </div>
                </div>
              </div>
            </td>
            <td>
              <p class="fw-normal mb-1">{{ project.deadline }}</p>
            </td>
            <td>
              <p class="fw-normal mb-1">-----------------</p>
            </td>
            <td>
              <span class="badge rounded-pill badge-success">
                {{ project.status }}
              </span>
            </td>
            <td>
              <button><i class="fa fa-times fa-2x" title="Annuler"></i></button>
              &emsp;
              <button :to="{ name: '' }">
                <i class="fas fa-check fa-2x" title="Terminé"></i>
              </button>
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
                  placeholder="Nom du projet"
                  required
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
                  onfocus="(this.type='date')"
                  required
                />
                <p
                  v-show="show_alert"
                  class="text-danger"
                  v-if="v$.deadline.$error"
                >
                  {{ v$.deadline.$errors[0].$message }}
                </p>
              </div>
              <div class="__form">
                <input
                  type="url"
                  v-model.trim="add_project.url"
                  class="__input"
                  placeholder="URL du projet"
                  required
                />
                <p v-show="show_alert" class="text-danger" v-if="v$.url.$error">
                  {{ v$.url.$errors[0].$message }}
                </p>
              </div>
              <div class="__form">
                <input
                  type="file"
                  class="__input form-control"
                  placeholder="Logo du projet"
                  @change="uploadLogo"
                  required
                />
                <p v-show="show_alert" class="text-danger" v-if="v$.url.$error">
                  {{ v$.url.$errors[0].$message }}
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
                <button @click="addProject">
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
      logo: null,
      projects: [],
    };
  },
  setup() {
    const add_project = reactive({
      name_project: null,
      deadline: null,
      url: null,
    });
    const rules = computed(() => {
      return {
        name_project: { required, sameAs: sameAs(add_project.name_project) },
        deadline: {
          required,
          minValue: helpers.withMessage(
            "The deadline must be greater than the current date",
            (value) => {
              return new Date(value) > new Date();
            }
          ),
          sameAs: sameAs(add_project.deadline),
        },
        url: { required, sameAs: sameAs(add_project.url) },
      };
    });
    const v$ = useValidate(rules, add_project);
    return { add_project, v$ };
  },
  methods: {
    uploadLogo: function (event) {
      this.logo = event.target.files[0];
    },
    redirect_route: function () {
      if (this.$store.getters.isLogged == false) {
        this.$router.push({ name: "login" });
      }
    },
    resetForm: function (e) {
      e.preventDefault();
      this.$refs.form_add.reset();
      this.show_alert = false;
    },
    addProject: function (e) {
      e.preventDefault();
      this.v$.$validate();
      const promise1 = Promise.resolve(this.v$.$validate());
      promise1.then((value) => {
        if (value == true) {
          let formData = new FormData();
          formData.append("logo", this.logo);
          formData.append("url", this.add_project.url);
          formData.append("deadline", this.add_project.deadline);
          formData.append("name_project", this.add_project.name_project);
          axiosClient
            .post("/project/create-project", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                charset: "utf-8",
                boundary: Math.random().toString().substr(2),
              },
            })
            .then((response) => {
              if (response.data["status"] == 201) {
                this.$refs.form_add.reset();
                //get list of projects
                this.getListProjects();
                this.$toast.show(response.data["response"], {
                  type: "success",
                  position: "top-right",
                });
              }
            });
        }
      });
    },
    getListProjects: function () {
      let response = axiosClient.get("/auth/show-projects");
      const list_projects = Promise.resolve(response);
      list_projects.then((value) => {
        if (value.data["status"] == 200) {
          this.projects = value.data["projects"];
          console.log(value.data);
        } else {
          //
        }
      });
    },
    redirect:function(page){
      this.$router.push({name:page});
    }
  },
  mounted() {
    //redirect after create instance ( if session expired /if user authenticated  or no)
    this.redirect_route();
    if (this.$store.getters.isLogged) {
      //get list of projects
      this.getListProjects();
    }
  },
};
</script>
<style scoped>
@import "../assets/css/bootstrap.min.css";
/* @import '../assets/css/font-awesome.css'; */
/* @import "../assets/css/templatemo-softy-pinko.css"; */
.row {
  position: relative;
  left: auto;
}
.empty {
  color: #ffb6c1;
  direction: ltr;
  font-family: cursive;
  font-size: 25px;
  font-weight: normal;
  letter-spacing: normal;
  line-height: 120%;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0.5%;
}
button {
  border: 0px;
  background-color: transparent;
}
.__form {
  padding: 10px 0px;
  position: relative;
  margin-left: -10%;
}
input.__input.form-control {
  margin-left: 14%;
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
table{
    background-color: rgb(255, 255, 255, 0.7 );
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
