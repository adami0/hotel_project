<template>
  <div id="error-page">
    <img src="../assets/404.svg" alt="404 error page not found">
    <div>
      <h1 class="padding">Oops... mauvaise planète!</h1>
      <p class="padding">Il semblerait que vous vous soyez trompé de planète,
        échappez-vous ils arrivent.</p>
      <button id="error-page-btn" @click="backToHome">Retour à l'accueil</button>
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
img {
  width: 100%;
  height: 500px;
}
@media screen and (max-width: 1200px) {
  img {
    width: 100%;
    height: auto;
  }
}
.padding {
  padding: 0 10px;
}
#error-page-btn {
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  padding: 15px 30px 15px 30px;
  margin-top: 20px;
  border-radius: 30px;
  background: #f48ac0;
}
</style>
