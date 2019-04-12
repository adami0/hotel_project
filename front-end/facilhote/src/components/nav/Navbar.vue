<template>
  <div
    v-if="isLoggedIn"
    class="d-flex flex-md-row align-items-center justify-content-between md-4 mb-3 bg-white border-bottom box-shadow margin-bottom"
  >
    <router-link class="py-2 px-5 mr-md-auto nav-bg_color font-weight-normal" to="/">
      <img width="40px" src="@/assets/logofh.png" alt="facil'hôte logo">
    </router-link>
    <nav class="my-2 navbarwithimg my-md-0 md-3">
      <img
        v-if="$store.state.users.user.avatar"
        class="avatar"
        :src="this.$store.state.users.avatar"
        height="48px"
        width="48px"
      >
      <img v-else class="avatar" src="@/assets/avatar.svg" height="48px" width="48px">
      <span class="py-3 px-3 text-dark">{{ $store.state.users.user.username }}</span>
      <a
        class="py-3 px-4 nav-bg_color text-white dropdown-toggle"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <font-awesome-icon :icon="isMobile ? 'bars' : 'cog'" size="lg"/>
      </a>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
        <router-link class="dropdown-item mobile" to="/">
          <font-awesome-icon icon="home" size="lg"/>
          <span class="px-2">Accueil</span>
        </router-link>

        <router-link class="dropdown-item mobile" to="/calendar">
          <font-awesome-icon icon="calendar-alt" size="lg"/>
          <span class="px-2">Réservations</span>
        </router-link>

        <router-link class="dropdown-item" to="/profile">
          <font-awesome-icon icon="user" size="lg"/>
          <span class="px-2">Mon profil</span>
        </router-link>

        <a @click="logout" class="dropdown-item">
          <font-awesome-icon icon="power-off" size="lg"/>
          <span class="px-2">Déconnexion</span>
        </a>
      </div>

      <router-link class="py-3 px-3 nav-bg_color border-left text-white home" to="/">
        <font-awesome-icon icon="home" size="lg"/>
      </router-link>

      <router-link class="py-3 px-3 nav-bg_color border-left text-white home" to="/calendar">
        <font-awesome-icon icon="calendar-alt" size="lg"/>
      </router-link>
      <!-- <a class="py-3 px-3 nav-bg_color border-left text-white" @click.stop="toggleSideBar()">
        <font-awesome-icon :icon="['fa', activeIcon ]" size="lg"/>
      </a>-->
    </nav>
  </div>
</template>

<script>
// import { EventBus } from "./../../event-bus.js";
export default {
  data() {
    return {
      isMobile: window.innerWidth <= 600
      // isActive: false,
      // activeIcon: "bars"
    };
  },
  created() {
    addEventListener("resize", () => {
      this.isMobile = innerWidth <= 600;
    });
    // EventBus.$on("hide-sidebar", status => {
    //   this.isActive = status;
    //   this.activeIcon = this.isActive ? "times" : "bars";
    // });
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["users/isLoggedIn"];
    }
  },
  methods: {
    // toggleSideBar() {
    //   this.isActive = !this.isActive;
    //   this.activeIcon = this.isActive ? "times" : "bars";
    //   EventBus.$emit("toggle-sidebar", this.isActive);
    // },
    logout() {
      this.$store.dispatch("users/logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped>
.navbarwithimg .avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: transparent !important;
  z-index: 999;
}
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
.dropdown-menu.dropdown-menu-right {
  background: #c09a73;
}
.dropdown-item {
  cursor: pointer;
  background: #c09a73;
  color: white !important;
}
.dropdown-item.mobile {
  display: none;
}
.dropdown-item:active,
.dropdown-item:hover {
  background: #8d7154;
}
@media screen and (max-width: 600px) {
  .nav-bg_color.home {
    display: none;
  }
  .dropdown-item.mobile {
    display: block;
  }
  .nav-bg_color.font-weight-normal {
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
  }
}
</style>
