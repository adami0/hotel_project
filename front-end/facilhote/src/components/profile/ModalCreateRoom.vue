<template>
  <div
    class="modal fade"
    id="formCreateRoomModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="formCreateRoomModal"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="formCreateRoomModal">Créer une chambre</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form role="form">
            <div class="form-group row">
              <label class="col-lg-3 col-form-label form-control-label">Numéro de la chambre</label>
              <div class="col-lg-9">
                <input class="form-control" type="number" v-model="roomNumber">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label form-control-label">Status</label>
              <div class="col-lg-9">
                <input class="form-control" type="checkbox" v-model="status">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label form-control-label">Type</label>
              <div class="col-lg-9">
                <select v-model="type">
                  <option selected>Double</option>
                  <option value="1">Triple</option>
                  <option value="2">Quintuple</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label form-control-label">Color</label>
              <div class="col-lg-9">
                <input class="form-control" type="color" v-model="color">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
          <button
            type="button"
            class="btn btn-success"
            data-dismiss="modal"
            @click="createRoom"
          >Confirmer</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { EventBus } from "./../../event-bus";
export default {
  data() {
    return {
      roomNumber: "",
      status: true,
      type: "",
      color: ""
    };
  },
  methods: {
    createRoom() {
      const newRoom = {
        roomNumber: this.roomNumber,
        status: this.status,
        type: this.type,
        color: this.color
      };
      if (this.password === this.confirmPassword) {
        this.$store.dispatch("rooms/createRoom", newRoom).then(res => {
          EventBus.$emit("message-from-app", {
            txt: res.data.message,
            status: "alert-success"
          });
        });
      } else {
        EventBus.$emit("message-from-app", {
          txt: "Les mots de passe ne correspondent pas !",
          status: "alert-warning"
        });
      }
    }
  }
};
</script>
