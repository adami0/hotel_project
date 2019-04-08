<template>
  <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
</template>

<script>
import VePie from "v-charts/lib/pie.common";
export default {
  components: { VePie },
  computed: {
    chartSettings() {
      return {
        dataType: function(v) {
          return v + " €";
        }
      };
    },
    chartData() {
      return {
        columns: ["month", "Montant"],
        rows: this.$store.getters["kpis/profitKpisData"]
      };
    }
  },
  created() {
    this.$store.dispatch("kpis/getProfitKpi");
  }
};
</script>
