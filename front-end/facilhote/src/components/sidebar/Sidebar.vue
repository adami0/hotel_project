<template>
  <div class="wrapper" v-if="isLoggedIn" v-click-outside="closeSideBar">
    <nav id="sidebar" ref="sideBar">
      <div class="sidebar-header">
        <img src="./../../assets/logofh.png" title="logo_facil_hote">
      </div>

      <div class="sidebar-user">Bienvenue {{ $store.state.users.user.username }}</div>

      <ul class="list-unstyled components">
        <li>
          <router-link to="/">
            <font-awesome-icon icon="tachometer-alt" size="lg"/>
            <span class="sidebar-category">Tableau de bord</span>
          </router-link>
        </li>
        <li>
          <router-link to="/calendar">
            <font-awesome-icon icon="calendar-alt" size="lg"/>
            <span class="sidebar-category">Réservations</span>
          </router-link>
        </li>
        <li>
          <router-link to="/client">
            <font-awesome-icon icon="user" size="lg"/>
            <span class="sidebar-category">Clients</span>
          </router-link>
        </li>
        <li>
          <font-awesome-icon icon="credit-card" size="lg"/>
          <span class="sidebar-category">Factures</span>
        </li>
        <li>
          <font-awesome-icon icon="chart-bar" size="lg"/>
          <span class="sidebar-category">État des chambres</span>
        </li>
        <li>
          <font-awesome-icon icon="exclamation-triangle" size="lg"/>
          <span class="sidebar-category">Incidents</span>
        </li>
        <li>
          <font-awesome-icon icon="archive" size="lg"/>
          <span class="sidebar-category">Stocks</span>
        </li>
        <li>
          <font-awesome-icon icon="cog" size="lg"/>
          <span class="sidebar-category">Paramètres</span>
        </li>
        <li>
          <font-awesome-icon icon="power-off" size="lg"/>
          <span class="sidebar-category">Déconnexion</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { EventBus } from "./../../event-bus.js";

export default {
  data() {
    return {
      isActive: null,
      sidebar: null
    };
  },
  mounted() {
    this.sidebar = this.$refs.sideBar;
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["users/isLoggedIn"];
    }
  },
  created() {
    EventBus.$on("toggle-sidebar", status => {
      this.isActive = status;
      this.toggleNavBar();
    });
  },
  methods: {
    toggleNavBar() {
      if (this.isActive) {
        this.sidebar.classList.add("active");
      } else {
        this.sidebar.classList.remove("active");
      }
    },
    closeSideBar(event) {
      if (this.isActive) {
        this.sidebar.classList.remove("active");
        EventBus.$emit("hide-sidebar", false);
      }
    }
  },
  directives: {
    clickOutside: {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            if (vnode.context.isActive) {
              vnode.context[binding.expression](event);
            }
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      }
    }
  }
};
</script>

<style scoped>
a,
a:focus,
a:hover {
  color: inherit;
  display: block;
  height: 100%;
  text-decoration: none;
  width: 100%;
}

#sidebar {
  background: #343434;
  color: #fff;
  height: 100vh;
  left: -250px;
  position: fixed;
  top: 0;
  -webkit-transition: left 0.5s;
  transition: left 0.5s;
  width: 200px;
  z-index: 999;
}

#sidebar.active {
  left: 0;
  -webkit-transition: left 0.6s;
  transition: left 0.6s;
}

#sidebar .sidebar-header {
  border-bottom: 2px solid #6f5f4f;
  padding: 2px;
  text-align: center;
}

#sidebar .sidebar-header img {
  width: 20%;
}

#sidebar .sidebar-user {
  color: #fff;
  padding: 60px 0px;
  text-align: center;
}

#sidebar ul li {
  background: #c09a73;
  border-top: 2px solid #fff;
  cursor: pointer;
  display: block;
  font-size: 0.9em;
  padding: 10px 0px 10px 15px;
  text-align: left;
}

#sidebar ul li:last-child {
  border-bottom: 2px solid #fff;
}

#sidebar ul li:hover {
  background: #a58260;
  color: #fff;
}

#sidebar ul li .sidebar-category {
  margin-left: 10px;
  width: 80%;
}
</style>

