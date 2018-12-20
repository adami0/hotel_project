<template>
  <div
    class="d-flex flex-md-row align-items-center justify-content-between md-4 mb-3 bg-white border-bottom box-shadow margin-bottom"
  >
    <router-link class="py-2 px-5 mr-md-auto nav-bg_color font-weight-normal" to="/">
      <img width="40px" src="@/assets/logofh.png" alt="facil'hôte logo">
    </router-link>
    <nav class="my-2 my-md-0 md-3">
      <span class="py-3 px-3 text-dark">Anne Joly</span>
      <a class="py-3 px-3 nav-bg_color text-white" href="#">
        <font-awesome-icon icon="caret-down" size="lg"/>
      </a>
      <router-link class="py-3 px-3 nav-bg_color border-left text-white" to="/">
        <font-awesome-icon icon="home" size="lg"/>
      </router-link>
      <a class="py-3 px-3 nav-bg_color border-left text-white" href="#">
        <font-awesome-icon icon="bars" size="lg"/>
      </a>
    </nav>
  </div>
</template>

<style scoped>
.nav-bg_color:hover {
  background: #8d7154;
}
.nav-bg_color {
  background: #c09a73;
  cursor: pointer;
}
.border_white {
  border-left: 3px white;
}
.margin-bottom {
  margin-bottom: 0 !important;
}
</style>
