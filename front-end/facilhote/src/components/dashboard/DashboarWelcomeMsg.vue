<template>
  <div class="welcomeMsg">
    Bonjour <strong userName="John Doe"></strong>, nous vous souhaitons la bienvenue sur votre dashboard!
  </div>
</template>

<script>
export default {
  name : 'DashboardWelcomeMsg',
  props: {
    userName: String
  },
};
</script>

<style lang="scss" scoped>
.welcomeMsg {
  background: #8d7154;
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: whitesmoke;
}
</style>
