<template>
  <div
    v-if="isLoggedIn"
    class="d-flex flex-md-row align-items-center justify-content-between md-4 mb-3 bg-white border-bottom box-shadow margin-bottom"
  >
    <router-link class="py-2 px-5 mr-md-auto nav-bg_color font-weight-normal" to="/">
      <img width="40px" src="@/assets/logofh.png" alt="facil'hôte logo">
    </router-link>
    <nav class="my-2 my-md-0 md-3">
      <span class="py-3 px-3 text-dark">Anne Joly</span>
      <a
        class="py-3 px-4 nav-bg_color text-white dropdown-toggle"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      ></a>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
        <router-link class="dropdown-item" to="/profil">
          <font-awesome-icon icon="user" size="lg"/>
          <span class="px-2">Mon profil</span>
        </router-link>
        <a @click="logout" class="dropdown-item">
          <font-awesome-icon icon="power-off" size="lg"/>
          <span class="px-2">Déconnexion</span>
        </a>
      </div>

      <router-link class="py-3 px-3 nav-bg_color border-left text-white" to="/">
        <font-awesome-icon icon="home" size="lg"/>
      </router-link>

      <a class="py-3 px-3 nav-bg_color border-left text-white" @click="toggleSideBar()">
        <font-awesome-icon :icon="['fa', activeIcon ]" size="lg"/>
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
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    toggleSideBar() {
      this.isActive = !this.isActive;
      this.activeIcon = this.isActive ? "times" : "bars";
      EventBus.$emit("toggle-sidebar", this.isActive);
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
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
.dropdown-item {
  cursor: pointer;
  background: #c09a73;
  color: white !important;
}
.dropdown-item:active,
.dropdown-item:hover {
  background: #8d7154;
}
</style>
