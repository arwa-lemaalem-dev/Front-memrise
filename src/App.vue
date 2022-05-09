<template>
  <div>
    <component :is="currentRouteName == 'notFound' ? '' : 'NavBar'" />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
  },
  created() {
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  mounted() {},
};
</script>

<style>
 #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
} 
</style>
