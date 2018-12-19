<template>
  <div class="search-reservation">
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <div class="input-group mt-2">
            <input type="text" class="form-control" placeholder="Rechercher une réservation">
            <div class="input-group-append">
              <span class="input-group-text btn-bg-color">
                <font-awesome-icon icon="search" size="lg"/>
              </span>
            </div>
          </div>
          <div class="my-2">
            <button type="button" class="mr-5 px-5 btn btn-lg btn-bg-color">Créer une réservation</button>
            <button type="button" class="px-5 btn btn-lg btn-bg-color">Voir une réservation</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-reservation {
  background: #343434;
}
.btn-bg-color {
  background: #c09a73;
  color: white;
  cursor: pointer;
}
</style>

