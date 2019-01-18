<template>
  <div id="app">
    <div>
      <Navbar/>
      <Sidebar/>
    </div>
    <alert-message/>
    <main id="main-content">
      <router-view/>
    </main>
  </div>
</template>

<script>
import AlertMessage from "@/components/alertMessage/AlertMessage.vue";
import Navbar from "@/components/nav/Navbar.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";
export default {
  components: {
    Navbar,
    Sidebar,
    AlertMessage
  },
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout);
        }
        throw err;
      });
    });
  }
};
</script>


<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-color: #f8fafb;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
