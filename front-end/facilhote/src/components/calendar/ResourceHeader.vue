<template>
  <div class="template-wrap">
    <div class="room-name">{{data.resourceData.text}}</div>
    <div class="room-type">{{data.resourceData.type}}</div>
    <div class="room-state">{{data.resourceData.state}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    };
  }
};
</script>
