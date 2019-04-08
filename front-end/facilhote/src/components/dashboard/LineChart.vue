<template>
  <ve-line :data="chartData" :settings="chartSettings"></ve-line>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
import { mapState } from "vuex";
export default {
  components: { VeLine },
  computed: {
    chartSettings() {
      return {
        nullAddZero: true,
        area: true
      };
    },
    chartData() {
      return {
        columns: ["month", "Réservations"],
        rows: this.$store.getters["kpis/reservationsKpisData"]
      };
    }
  },
  created() {
    this.$store.dispatch("kpis/getReservationsKpi");
  }
};
</script>
