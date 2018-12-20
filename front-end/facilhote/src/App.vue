<template>
  <div id="app">
    <div>
      <Navbar></Navbar>
    </div>
    <main id="main-content">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/nav/Navbar";
export default {
  components: {
    Navbar: Navbar
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
