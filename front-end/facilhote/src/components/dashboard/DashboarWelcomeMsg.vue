<template>
  <div class="welcomeMsg">
    Bonjour
    <strong>{{ $store.state.users.user.username }}</strong>
    , {{ $store.state.users.user.about }}!
  </div>
</template>

<script>
export default {};
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
