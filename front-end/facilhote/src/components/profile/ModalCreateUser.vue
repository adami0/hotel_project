<template>
  <div
    class="modal fade"
    id="formCreateUserModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="formCreateUserModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="formCreateUserModalLabel">Créer un compte utilisateur</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form role="form">
            <div class="form-group row">
              <label class="col-lg-3 col-form-label form-control-label">Nom de l'utilisateur</label>
              <div class="col-lg-9">
                <input class="form-control" type="text" v-model="userName">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label form-control-label">Email</label>
              <div class="col-lg-9">
                <input class="form-control" type="email" v-model="email">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label form-control-label">Admin</label>
              <div class="col-lg-9">
                <input class="form-control" type="checkbox" v-model="admin">
              </div>
            </div>
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
            @click="createUser"
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
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      admin: false
    };
  },
  methods: {
    createUser() {
      const newUser = {
        userName: this.userName,
        email: this.email,
        password: this.password,
        admin: this.admin
      };
      if (this.password === this.confirmPassword) {
        this.$store.dispatch("users/createUser", newUser).then(res => {
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
