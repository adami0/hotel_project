<template>
  <div class="tab-pane table-responsive" id="users">
    <ModalCreateUser></ModalCreateUser>
    <ModalChangePassword></ModalChangePassword>
    <h4 class="my-2">Liste des utilisateurs</h4>
    <table v-if="$store.state.users.user.is_admin" class="table table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">Nom d'utilisateur</th>
          <th scope="col">Email</th>
          <th scope="col">Rôle (Admin?)</th>
          <th scope="col">Mot de passe</th>
          <th scope="col">Date de création</th>
          <th colspan="2">
            <button
              type="button"
              class="btn btn-success"
              data-toggle="modal"
              data-target="#formCreateUserModal"
            >
              <font-awesome-icon icon="plus-circle" size="lg"/>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in allUsersData"
          :key="user.id"
          :class="{editing: user === editedUser}"
          v-cloak
        >
          <th scope="row">
            <span class="view">{{ user.username }}</span>
            <span class="edit">
              <input type="text" v-model="user.username">
            </span>
          </th>
          <td>
            <span class="view">{{ user.email }}</span>
            <span class="edit">
              <input type="text" v-model="user.email">
            </span>
          </td>
          <td>
            <span class="view">{{ user.is_admin }}</span>
            <span class="edit">
              <input type="text" v-model="user.is_admin">
            </span>
          </td>
          <td>
            <button
              type="button"
              data-toggle="modal"
              @click.prevent="changePassword(user)"
              data-target="#formChangeUserPasswordModal"
              class="btn btn-secondary"
            >
              <font-awesome-icon icon="key" size="lg"/>
            </button>
          </td>
          <td>
            <span class="view">{{ user.created_at }}</span>
            <span class="edit">
              <input type="text" v-model="user.created_at">
            </span>
          </td>
          <td>
            <button
              type="button"
              @click.stop="user.isSelected ? updateUser(user) : editUser(user)"
              :class="user.isSelected ? 'btn btn-success' : 'btn btn-info'"
            >
              <font-awesome-icon :icon="user.isSelected ? 'check-circle' : 'edit'" size="lg"/>
            </button>
          </td>
          <td>
            <button
              type="button"
              @click.stop="user.isSelected ? cancelEdit(user): deleteUser(user)"
              :class="user.isSelected ? 'btn btn-warning' : 'btn btn-danger'"
            >
              <font-awesome-icon :icon="user.isSelected ? 'times-circle' : 'trash-alt'" size="lg"/>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert alert-info">
      <h4 class="alert-heading">Attention!</h4>
      <p
        class="mb-0"
      >Vous n'avez pas les droits nécessaires pour effectuer cette opération, veuillez contacter votre administrateur.</p>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { EventBus } from "./../../event-bus";
import ModalCreateUser from "./ModalCreateUser";
import ModalChangePassword from "./ModalChangePassword";
export default {
  components: {
    ModalCreateUser,
    ModalChangePassword
  },
  data() {
    return {
      editMode: false,
      editedUser: null
    };
  },
  methods: {
    editUser(user) {
      this.editMode = true;
      this.editedUser = user;
      user.isSelected = true;
    },
    updateUser(user) {
      this.editMode = false;
      this.editedUser = null;
      user.isSelected = false;
      console.log(user);
      this.$store.dispatch("users/updateUser", user).then(response => {
        EventBus.$emit("message-from-app", {
          txt: response.data.message,
          status: "alert-success"
        });
      });
    },
    cancelEdit(user) {
      this.editMode = false;
      this.editedUser = null;
      user.isSelected = false;
    },
    changePassword(user) {
      EventBus.$emit("change-user-password", user);
    },
    deleteUser(user) {
      let answer = confirm(
        `Étes-vous sûr de vouloir supprimer l'utilisateur ${user.username} ?`
      );
      if (answer) {
        this.$store.dispatch("users/deleteUser", user.id).then(response => {
          EventBus.$emit("message-from-app", {
            txt: response.data.message,
            status: "alert-success"
          });
        });
      }
    }
  },
  computed: {
    allUsersData() {
      return this.$store.getters["users/getAllUsers"];
    }
  },
  created() {
    this.$store.dispatch("users/getAllUsers");
  }
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
.edit {
  display: none;
}
.editing .edit {
  display: block;
}
.editing .view {
  display: none;
}
</style>

