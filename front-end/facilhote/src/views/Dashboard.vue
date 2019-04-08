<template>
  <div>
    <DashboarWelcomeMsg></DashboarWelcomeMsg>
    <cards-info
      v-if="roomsStatus"
      :freeRooms="roomsStatus.total_room - roomsStatus.today_bookings"
      :todayBookings="roomsStatus.today_bookings"
      :cleaningRooms="roomsStatus.check_room"
    ></cards-info>
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <h4>Nombre de réservations par mois</h4>
          <line-chart></line-chart>
        </div>
        <div class="col-lg-6">
          <h4>Chiffre d'affaire par mois</h4>
          <pie-chart></pie-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboarWelcomeMsg from "@/components/dashboard/DashboarWelcomeMsg.vue";
import CardsInfo from "@/components/dashboard/CardsInfo.vue";
import LineChart from "@/components/dashboard/LineChart.vue";
import PieChart from "@/components/dashboard/PieChart.vue";
export default {
  name: "dashboard",
  components: {
    DashboarWelcomeMsg,
    CardsInfo,
    LineChart,
    PieChart
  },
  computed: {
    roomsStatus() {
      return this.$store.getters["kpis/roomsStatuKpisData"];
    }
  },
  created() {
    this.$store.dispatch("kpis/getRoomsStatuKpi");
  }
};
</script>
