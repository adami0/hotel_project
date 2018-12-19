<template>
  <div>
    <Search></Search>
    <Calendar></Calendar>
  </div>
</template>

<script>
import Calendar from "@/components/calendar/Calendar.vue";
import Search from "@/components/search/Search.vue";
export default {
  components: {
    Calendar,
    Search
  }
};
</script>

