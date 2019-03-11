<template>
  <span class="month">{{getMonthDetails(data)}}</span>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  methods: {
    getMonthDetails(value) {
      return instance.formatDate(value.date, { skeleton: "yMMMM" });
    }
  }
};
</script>
