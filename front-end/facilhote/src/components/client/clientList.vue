<template>
  <div class>
    <div class="table-responsive-lg">
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Civilité</th>
            <th scope="col">Prénom</th>
            <th scope="col">Nom</th>
            <th scope="col">Adresse</th>
            <th scope="col">Postal</th>
            <th scope="col">Téléphone</th>
            <th scope="col">E-mail</th>
            <th scope="col">Chambre</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody class="table-sm">
          <tr v-for="client in clients" :key="client.index">
            <th>{{ client.id }}</th>
            <td>{{ client.gender }}</td>
            <td>{{ client.first_name }}</td>
            <td>{{ client.last_name }}</td>
            <td>{{ client.adresse }}</td>
            <td>{{ client.postal_code }}</td>
            <td>{{ client.telephone }}</td>
            <td>{{ client.email}}</td>
            <td>{{ client.room_number }}</td>
            <td>
              <button>Modifier</button>
            </td>
            <td>
              <button>Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clients: [
        {
          id: 1,
          first_name: "Ann",
          last_name: "Cubbino",
          email: "acubbino0@w3.org",
          gender: "Female",
          telephone: "999-491-7937",
          postal_code: null,
          room_number: "2859",
          adresse: "5385 Continental Pass"
        },
        {
          id: 2,
          first_name: "Lina",
          last_name: "Butland",
          email: "lbutland1@seattletimes.com",
          gender: "Female",
          telephone: "388-326-8254",
          postal_code: null,
          room_number: "967",
          adresse: "296 Wayridge Place"
        },
        {
          id: 3,
          first_name: "Richie",
          last_name: "Utridge",
          email: "rutridge2@businessinsider.com",
          gender: "Male",
          telephone: "170-939-7902",
          postal_code: "35047 CEDEX 9",
          room_number: "68",
          adresse: "53861 Transport Avenue"
        },
        {
          id: 4,
          first_name: "Carmina",
          last_name: "Conyers",
          email: "cconyers3@squarespace.com",
          gender: "Female",
          telephone: "899-143-6431",
          postal_code: null,
          room_number: "796",
          adresse: "5 Helena Pass"
        },
        {
          id: 5,
          first_name: "Hilde",
          last_name: "Clarae",
          email: "hclarae4@tripod.com",
          gender: "Female",
          telephone: "920-570-9391",
          postal_code: "61663",
          room_number: "64051",
          adresse: "23143 Nova Park"
        },
        {
          id: 6,
          first_name: "Alair",
          last_name: "Conquer",
          email: "aconquer5@cdbaby.com",
          gender: "Male",
          telephone: "254-953-7690",
          postal_code: null,
          room_number: "739",
          adresse: "0 Springs Drive"
        },
        {
          id: 7,
          first_name: "Arther",
          last_name: "Biggam",
          email: "abiggam6@tinyurl.com",
          gender: "Male",
          telephone: "179-393-1266",
          postal_code: null,
          room_number: "094",
          adresse: "410 Northwestern Circle"
        },
        {
          id: 8,
          first_name: "Kevyn",
          last_name: "Markova",
          email: "kmarkova7@goo.gl",
          gender: "Female",
          telephone: "898-794-4410",
          postal_code: null,
          room_number: "27",
          adresse: "266 Buhler Drive"
        },
        {
          id: 9,
          first_name: "Adore",
          last_name: "Finlow",
          email: "afinlow8@sourceforge.net",
          gender: "Female",
          telephone: "869-853-4854",
          postal_code: null,
          room_number: "8",
          adresse: "0 Sherman Parkway"
        },
        {
          id: 10,
          first_name: "Tam",
          last_name: "Sanderson",
          email: "tsanderson9@seesaa.net",
          gender: "Male",
          telephone: "874-981-4325",
          postal_code: "G6E",
          room_number: "2280",
          adresse: "3742 Corry Hill"
        },
        {
          id: 11,
          first_name: "Darrel",
          last_name: "Izard",
          email: "dizarda@prnewswire.com",
          gender: "Male",
          telephone: "685-696-5451",
          postal_code: "2424",
          room_number: "417",
          adresse: "65 Waxwing Trail"
        },
        {
          id: 12,
          first_name: "Geralda",
          last_name: "Swetenham",
          email: "gswetenhamb@kickstarter.com",
          gender: "Female",
          telephone: "139-915-9150",
          postal_code: "47849",
          room_number: "225",
          adresse: "3 Artisan Park"
        },
        {
          id: 13,
          first_name: "Bradford",
          last_name: "Jevons",
          email: "bjevonsc@howstuffworks.com",
          gender: "Male",
          telephone: "381-605-6464",
          postal_code: "41-106",
          room_number: "9990",
          adresse: "80674 Nancy Trail"
        },
        {
          id: 14,
          first_name: "Nina",
          last_name: "Aleavy",
          email: "naleavyd@yahoo.com",
          gender: "Female",
          telephone: "219-295-9567",
          postal_code: "424 31",
          room_number: "06",
          adresse: "1 Park Meadow Crossing"
        },
        {
          id: 15,
          first_name: "Lyndsay",
          last_name: "Putland",
          email: "lputlande@theatlantic.com",
          gender: "Female",
          telephone: "316-535-7089",
          postal_code: "365-0024",
          room_number: "4477",
          adresse: "2696 Bartelt Alley"
        },
        {
          id: 16,
          first_name: "Kenton",
          last_name: "Flintuff",
          email: "kflintufff@uol.com.br",
          gender: "Male",
          telephone: "537-993-9648",
          postal_code: null,
          room_number: "12662",
          adresse: "160 Judy Center"
        },
        {
          id: 17,
          first_name: "Daphna",
          last_name: "Darco",
          email: "ddarcog@prnewswire.com",
          gender: "Female",
          telephone: "996-775-9558",
          postal_code: null,
          room_number: "85",
          adresse: "63549 Bellgrove Lane"
        },
        {
          id: 18,
          first_name: "Gottfried",
          last_name: "Cochran",
          email: "gcochranh@engadget.com",
          gender: "Male",
          telephone: "727-433-5967",
          postal_code: "45201",
          room_number: "0056",
          adresse: "8746 Hallows Lane"
        },
        {
          id: 19,
          first_name: "Ross",
          last_name: "Dunhill",
          email: "rdunhilli@yellowpages.com",
          gender: "Male",
          telephone: "208-304-1199",
          postal_code: null,
          room_number: "634",
          adresse: "44353 Summer Ridge Road"
        },
        {
          id: 20,
          first_name: "Crichton",
          last_name: "Arnolds",
          email: "carnoldsj@csmonitor.com",
          gender: "Male",
          telephone: "387-961-7362",
          postal_code: null,
          room_number: "862",
          adresse: "8073 Clove Drive"
        }
      ]
    };
  }
};
</script>

<style scoped>
th,
td {
  border-top: none;
}

th {
  font-size: 0.8em;
}
</style>
