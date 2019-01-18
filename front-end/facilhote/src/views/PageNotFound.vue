<template>
  <div id="error-page">
    <div class="page-text d-flex flex-column align-items-center pb-4">
      <h2 class="mt-auto">Oops... mauvaise planète!</h2>
      <p class="px-2">Il semblerait que vous vous soyez trompé de planète,
        échappez-vous ils arrivent.</p>
      <button id="error-page-btn" @click="backToHome">
        &#x1F680; Cliquez ici pour vous échapper &#x1F680;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error-page',
  methods: {
    backToHome: () => {
      window.location.href = '/';
    },
  },
};
</script>

<style lang="scss" scoped>
#error-page {
  background: url(../assets/404.svg) center / contain no-repeat;
  height: calc(100vh - 55px);
  width: 100%;
}
.page-text {
  height: 100%;
}
#error-page-btn {
  color: #fff;
  cursor: pointer;
  font-size: .8rem;
  font-weight: bold;
  padding: 15px 30px 15px 30px;
  margin-top: 20px;
  border-radius: 30px;
  background: #f48ac0;
}
</style>
