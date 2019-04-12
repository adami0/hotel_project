<template>
  <div class="container my-4">
    <div class="card-deck mb-3 text-center">
      <div class="card mb-4 shadow-sm">
        <div class="card-header bg-success text-white">
          <h6 class="my-0 font-weight-normal">CHAMBRE LIBRE</h6>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">
            <font-awesome-icon icon="door-open" size="lg"/>
            {{ freeRooms }}
          </h1>
        </div>
      </div>
      <div class="card mb-4 shadow-sm">
        <div class="card-header bg-secondary text-white">
          <h6 class="my-0 font-weight-normal">CHAMBRE OCCUPEE</h6>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">
            <font-awesome-icon icon="bed" size="lg"/>
            {{ todayBookings }}
          </h1>
        </div>
      </div>
      <div class="card mb-4 shadow-sm">
        <div class="card-header bg-warning text-white">
          <h6 class="my-0 font-weight-normal">CHAMBRE A VERIFIER</h6>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">
            <font-awesome-icon icon="broom" size="lg"/>
            {{ cleaningRooms }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    freeRooms: {
      type: Number,
      required: true
    },
    todayBookings: {
      type: Number,
      required: true
    },
    cleaningRooms: {
      type: Number,
      required: true
    }
  }
};
</script>


