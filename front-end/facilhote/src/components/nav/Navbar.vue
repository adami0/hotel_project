<template>
  <div
    class="d-flex flex-md-row align-items-center justify-content-between md-4 mb-3 bg-white border-bottom box-shadow margin-bottom"
  >
    <router-link class="py-2 px-5 mr-md-auto nav-bg_color font-weight-normal" to="/">
      <img width="40px" src="@/assets/logofh.png" alt="facil'hôte logo">
    </router-link>
    <nav class="my-2 my-md-0 md-3">
      <span class="py-3 px-3 text-dark">Anne Joly</span>
      <a
        class="py-3 px-4 nav-bg_color text-white dropdown-toggle"
        href="#"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      ></a>
      <ul
        class="list-unstyled components dropdown-menu"
        id="top-menu"
        aria-labelledby="dropdownMenuButton"
      >
        <li>
          <a href="/">
            <font-awesome-icon icon="user" size="lg"/>
            <span class="sidebar-category">MonProfil</span>
          </a>
        </li>
        <li>
          <a href="/">
            <font-awesome-icon icon="power-off" size="lg"/>
            <span class="sidebar-category">Déconnexion</span>
          </a>
        </li>
      </ul>
      <router-link class="py-3 px-3 nav-bg_color border-left text-white" to="/">
        <font-awesome-icon icon="home" size="lg"/>
      </router-link>
      <a class="py-3 px-3 nav-bg_color border-left text-white" @click="helloVue()">
        <font-awesome-icon id="icon-for-sidebar" :icon="['fa', activeIcon ]" size="lg"/>
      </a>
    </nav>
  </div>
</template>

<script>
import { EventBus } from "./../../event-bus.js";
export default {
  data() {
    return {
      isActive: false,
      activeIcon: "bars"
    };
  },
  methods: {
    helloVue() {
      this.isActive = !this.isActive;
      this.activeIcon = this.isActive ? "times" : "bars";
      EventBus.$emit("toggle-sidebar", this.isActive);
    }
  }
};
</script>


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

#top-menu ul {
  background: #c09a73;
  padding: 0;
}

#top-menu li {
  background: #c09a73;
  border-top: 2px solid #fff;
  cursor: pointer;
  display: block;
  font-size: 0.9em;
  padding: 10px 0px 10px 15px;
  text-align: left;
}
</style>
