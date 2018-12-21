<template>
  <div class="search-reservation">
    <div class="container">
      <ul class="nav nav-pills nav-justified mb-3 .active" id="pills-tab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link"
            id="create-reservation-tab"
            data-toggle="pill"
            href="#create-reservation"
            role="tab"
            aria-controls="create-reservation"
            aria-selected="true"
          >Création de la réservation</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="room-selection-tab"
            data-toggle="pill"
            href="#room-selection"
            role="tab"
            aria-controls="room-selection"
            aria-selected="true"
          >Choix de la chambre</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="customer-tab"
            data-toggle="pill"
            href="#customer"
            role="tab"
            aria-controls="customer"
            aria-selected="true"
          >Création fiche client</a>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="create-reservation"
          role="tabpanel"
          aria-labelledby="create-reservation-tab"
        >
          <form class="form-inline">
            <div class="form-row">
              <div class="col">
                <label class="labelColor" for="checkIn">Arrivée</label>
                <div class="input-group input-group-sm mb-2 mr-sm-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text btn-bg-color">
                      <font-awesome-icon icon="calendar-alt" size="sm"/>
                    </div>
                  </div>
                  <input type="date" class="form-control" id="checkIn" placeholder="jj/mm/aaaa">
                </div>
              </div>
              <div class="col">
                <label class="labelColor" for="checkOut">Départ</label>
                <div class="input-group input-group-sm mb-2 mr-sm-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text btn-bg-color">
                      <font-awesome-icon icon="calendar-alt" size="sm"/>
                    </div>
                  </div>
                  <input type="date" class="form-control" id="checkOut" placeholder="jj/mm/aaaa">
                </div>
              </div>
              <div class="col">00
                <font-awesome-icon icon="moon" size="3x"/>
              </div>
              <div class="col">
                <label class="labelColor" for="nbOfAdults">Adultes</label>
                <div class="input-group input-group-sm mb-2 mr-sm-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text btn-bg-color">
                      <font-awesome-icon icon="users" size="sm"/>
                    </div>
                  </div>
                  <input type="number" class="form-control" id="nbOfAdults">
                </div>
              </div>
              <div class="col">
                <label class="labelColor" for="nbOfChildren">Enfants</label>
                <div class="input-group input-group-sm mb-2 mr-sm-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text btn-bg-color">
                      <font-awesome-icon icon="child" size="sm"/>
                    </div>
                  </div>
                  <input type="number" class="form-control" id="nbOfchildren">
                </div>
              </div>
              <div class="col">
                <label class="labelColor" for="singleRoom">Simple</label>
                <div class="input-group input-group-sm mb-2 mr-sm-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text btn-bg-color btn-bg-color">
                      <font-awesome-icon icon="bed" size="sm"/>
                    </div>
                  </div>
                  <input type="number" class="form-control" id="singleRoom">
                </div>
              </div>
              <div class="col">
                <label class="labelColor" for="doubleRoom">Double</label>
                <div class="input-group input-group-sm mb-2 mr-sm-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text btn-bg-color">
                      <font-awesome-icon icon="bed" size="sm"/>
                    </div>
                  </div>
                  <input type="number" class="form-control" id="doubleRoom">
                </div>
              </div>
              <button type="submit" class="btn btn-bg-color mb-2">Vérifier les disponibilités</button>
            </div>
          </form>
        </div>
        <div
          class="tab-pane fade"
          id="room-selection"
          role="tabpanel"
          aria-labelledby="room-selection-tab"
        ></div>
        <div class="tab-pane fade" id="customer" role="tabpanel" aria-labelledby="customer-tab">
          <form action class="form-inline">
            <div class="form-row">
              <div class="col-4">
                <div class="input-group input-group-sm mb-2 mr-sm-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text btn-bg-color"></div>
                  </div>
                  <select class="custom-select custom-select-sm">
                    <option value="Mme" selected>Mme</option>
                    <option value="M.">M.</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="input-group input-group-sm mb-2 mr-sm-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text btn-bg-color">
                      <font-awesome-icon icon size="sm"/>
                    </div>
                  </div>
                  <input type="text" class="form-control" placeholder="Nom">
                </div>
              </div>
            </div>
            <div class="col">
              <div class="input-group input-group-sm mb-2 mr-sm-2">
                <div class="input-group-prepend">
                  <div class="input-group-text btn-bg-color">
                    <font-awesome-icon icon size="sm"/>
                  </div>
                </div>
                <input type="text" class="form-control" placeholder="Prénom">
              </div>
            </div>
            <div class="col">
              <div class="input-group input-group-sm mb-2 mr-sm-2">
                <div class="input-group-prepend">
                  <div class="input-group-text btn-bg-color">
                    <font-awesome-icon icon size="sm"/>
                  </div>
                </div>
                <input type="text" class="form-control" placeholder="Adresse">
              </div>
            </div>
            <div class="col">
              <div class="input-group input-group-sm mb-2 mr-sm-2">
                <div class="input-group-prepend">
                  <div class="input-group-text btn-bg-color">
                    <font-awesome-icon icon size="sm"/>
                  </div>
                </div>
                <input type="text" class="form-control" placeholder="Code postal">
              </div>
            </div>
            <div class="col">
              <div class="input-group input-group-sm mb-2 mr-sm-2">
                <div class="input-group-prepend">
                  <div class="input-group-text btn-bg-color">
                    <font-awesome-icon icon="globe" size="sm"/>
                  </div>
                </div>
                <input type="text" class="form-control" placeholder="Pays">
              </div>
            </div>
            <div class="col">
              <div class="input-group input-group-sm mb-2 mr-sm-2">
                <div class="input-group-prepend">
                  <div class="input-group-text btn-bg-color">
                    <font-awesome-icon icon="phone" size="sm"/>
                  </div>
                </div>
                <input type="tel" class="form-control" placeholder="Téléphone">
              </div>
            </div>
            <div class="col">
              <div class="input-group input-group-sm mb-2 mr-sm-2">
                <div class="input-group-prepend">
                  <div class="input-group-text btn-bg-color">
                    <font-awesome-icon icon="at" size="sm"/>
                  </div>
                </div>
                <input type="email" class="form-control" placeholder="Email">
              </div>
            </div>

            <button type="submit" class="btn btn-bg-color mb-2">Valider</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-reservation {
  background: #343434;
  color: #8d7154;
}
.btn-bg-color {
  background: #c09a73;
  color: white;
  cursor: pointer;
}
a {
  color: #8d7154;
}
.labelColor {
  color: whitesmoke;
}
.form-inline label {
  justify-content: left;
}
</style>
