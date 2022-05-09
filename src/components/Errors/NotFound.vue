<template>
  <div class="container">
      <img alt="" src="@/assets/images/404_not_found.png" />
      <p class="error_msg">Oups, Rien ici....</p>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  computed() {},
  mounted() {},
};
</script>
<style scoped>
.error_msg {
  font-style: italic;
  font-size: 32px;
  line-height: 42px;
  text-align: center;
  color: #555555;
  font-family: "inherit";
}
div{
  text-align: center
}
</style>