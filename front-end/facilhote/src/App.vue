<template>
  <div id="app">
    <div>
      <Navbar/>
      <!-- <Sidebar/> -->
    </div>
    <alert-message/>
    <main id="main-content">
      <router-view/>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import AlertMessage from "@/components/alertMessage/AlertMessage.vue";
import Navbar from "@/components/nav/Navbar.vue";
// import Sidebar from "@/components/sidebar/Sidebar.vue";
import { loadCldr, L10n, setCulture } from "@syncfusion/ej2-base";

import * as numberingSystems from "./../node_modules/cldr-data/supplemental/numberingSystems.json";
import * as localeText from "./locale.json";
import * as gregorian from "./../node_modules/cldr-data/main/fr/ca-gregorian.json";
import * as numbers from "./../node_modules/cldr-data/main/fr/numbers.json";
import * as timeZoneNames from "./../node_modules/cldr-data/main/fr/timeZoneNames.json";
loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);
L10n.load(localeText);
setCulture("fr");

loadCldr(
  require("cldr-data/supplemental/numberingSystems.json"),
  require("cldr-data/main/fr/ca-gregorian.json"),
  require("cldr-data/main/fr/numbers.json"),
  require("cldr-data/main/fr/timeZoneNames.json")
);

export default {
  components: {
    Navbar,
    // Sidebar,
    AlertMessage
  },
  created() {
    if (moment().unix() >= localStorage.getItem("exp")) {
      this.$store.dispatch("users/logout");
    }
    axios.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch("users/logout");
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
  height: 100%;
  box-sizing: border-box;
  background-color: #f8fafb;
}
@import "./../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "./../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "./../node_modules/@syncfusion/ej2-calendars/styles/material.css";
@import "./../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "./../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "./../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "./../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "./../node_modules/@syncfusion/ej2-vue-schedule/styles/material.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.e-control.e-recurrenceeditor.e-lib.room-scheduler {
  display: none;
}
</style>
