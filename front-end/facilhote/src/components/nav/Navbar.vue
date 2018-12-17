<template>
  <div class="d-flex flex-column flex-md-row align-items-center md-4 mb-3 bg-white border-bottom box-shadow margin-bottom">
    <a class="py-2 px-5 mr-md-auto nav-bg_color font-weight-normal"><img width="40px" src="@/assets/logofh.png" alt="facil'hôte logo"></a>
    <nav class="my-2 my-md-0 md-3">
      <a class="py-3 px-3 text-dark" href="#">Anne joly</a>
      <a class="py-3 px-3 nav-bg_color text-white" href="#">
        <font-awesome-icon icon="caret-down" size="lg"/>
      </a>
      <a class="py-3 px-3 nav-bg_color border-left text-white" href="#">
        <font-awesome-icon icon="home" size="lg"/>
      </a>
      <a class="py-3 px-3 nav-bg_color border-left text-white" href="#">
        <font-awesome-icon icon="bars" size="lg"/>
      </a>
    </nav>
  </div>
</template>

<style scoped>
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
