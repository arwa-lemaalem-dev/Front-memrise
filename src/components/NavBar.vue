<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <router-link class="navbar-brand mt-2 mt-lg-0" :to="{ name: 'home' }">
          Memrise
        </router-link>

        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'login' }"
              v-show="!this.$store.state.user"
              >Se Connecter</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'register' }"
              v-show="!this.$store.state.user"
              >S'inscrire</router-link
            >
          </li>
        </ul>
      </div>

      <div class="d-flex align-items-center">
        <div class="dropdown" v-show="this.$store.state.user">
          <router-link
            class="dropdown-toggle d-flex align-items-center hidden-arrow"
            id="navbarDropdownMenuAvatar"
            :to="{ name: 'home' }"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            <img :src="this.$store.getters.urlBackend+this.$store.state.user['avatar']"
              class="rounded-circle"
              height="40"
              width="50"
              alt="Black and White Portrait of a Man"
              loading="lazy"
            />
          </router-link>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuAvatar"
          >
            <li>
              <router-link class="dropdown-item" :to="{ name: 'profile' }"
                >Mon profil</router-link
              >
            </li>
            <li>
              <router-link class="dropdown-item" :to="{ name: 'theme' }"
                >Thème</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'logout' }"
                class="dropdown-item"
                @click="logout"
                >Se déconnecter</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import axiosClient from "@/axios";
export default {
  data() {
    return {
      test: false,
    };
  },
  methods: {
    logout(e) {
      e.preventDefault();
      let response = axiosClient.get("/auth/logout");
      const response_logout = Promise.resolve(response);
      response_logout.then((value) => {
        if (value.data["status"] == 200) {
          this.$store.commit("logout");
          this.$router.push({ name: "login" });
        } else {
          this.$toast.show("Erreur du serveur \n Réessayer s'il vous plaît", {
            type: "error",
            position: "top-right",
          });
        }
      });
    },
  },
  created() {},
};
</script>
<style scoped>
.item {
  color: #e9967a;
  opacity: 3;
  text-decoration: underline transparent;
}
</style>