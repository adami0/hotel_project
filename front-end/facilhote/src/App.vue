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
import Navbar from "@/components/nav/Navbar.vue";
export default {
    components: {
      'Navbar' : Navbar,
    },
}
</script>


<style lang="scss">
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f8fafb;
}
#main-content {
  height: calc(100vh - 82px);
  width: 100%;
  padding-top: 82px;
}
</style>
