<template>
  <div
    class="modal fade"
    id="formChangeUserPasswordModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="formChangeUserPasswordModal"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            class="modal-title"
            id="formChangeUserPasswordModal"
          >Changer le mot de passe de l'utilisateur</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form role="form">
            <div class="form-group row">
              <label class="col-lg-3 col-form-label form-control-label">Mot de passe</label>
              <div class="col-lg-9">
                <input class="form-control" type="password" v-model="password">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label form-control-label">Confirmer mot de passe</label>
              <div class="col-lg-9">
                <input class="form-control" type="password" v-model="confirmPassword">
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
            @click.prevent="changePassword"
          >Confirmer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "./../../event-bus.js";
export default {
  created() {
    EventBus.$on("change-user-password", user => {
      this.userId = user.id;
    });
  },
  data() {
    return {
      userId: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    changePassword() {
      if (
        this.password === "" ||
        this.confirmPassword === "" ||
        this.confirmPassword !== this.password
      ) {
        EventBus.$emit("message-from-app", {
          txt: "Les champs ne sont pas valide",
          status: "alert-warning"
        });
      } else {
        this.$store
          .dispatch("users/updateUserPassword", {
            password: this.password,
            id: this.userId
          })
          .then(res => {
            EventBus.$emit("message-from-app", {
              txt: res.data.message,
              status: "alert-success"
            });
          });
      }
    }
  }
};
</script>
