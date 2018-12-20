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
          <div class="container my-2">
            <router-link to="/calendar">
              <button type="button" class="mr-5 px-5 btn btn-lg btn-bg-color">Créer une réservation</button>
            </router-link>
            <router-link to="/calendar">
              <button type="button" class="px-5 btn btn-lg btn-bg-color">Voir une réservation</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn:hover,
.input-group-text.btn-bg-color:hover {
  background: #8d7154;
}
.search-reservation {
  background: #343434;
}
.btn-bg-color {
  background: #c09a73;
  color: white;
  cursor: pointer;
}
@media (max-width: 776px) {
  .btn.btn-bg-color {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .btn.btn-bg-color ~ .btn.btn-bg-color {
    margin-top: 0.5rem;
  }
}
</style>

