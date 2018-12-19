<template>
  <div>
    <DashboarWelcomeMsg></DashboarWelcomeMsg>
    <cards-info></cards-info>
    <search-res></search-res>
    <informations></informations>
  </div>
</template>

<script>
import DashboarWelcomeMsg from '@/components/dashboard/DashboarWelcomeMsg.vue';
import Informations from '@/components/dashboard/Informations.vue';
import CardsInfo from '@/components/dashboard/CardsInfo.vue';
import SearchRes from '@/components/dashboard/SearchRes.vue';
export default {
  name: 'dashboard',
  components : {
    DashboarWelcomeMsg,
    Informations,
    SearchRes,
    CardsInfo
  }
}
</script>
