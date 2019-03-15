<template>
  <div class="template-wrap" :style="{background: data.PrimaryColor}">
    <div class="subject" :style="{background: data.SecondaryColor}">{{data.Subject}}</div>
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
