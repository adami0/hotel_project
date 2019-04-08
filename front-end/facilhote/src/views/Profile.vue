<template>
  <div class="container my-5">
    <div class="row">
      <avatar></avatar>
      <div class="col-lg-9">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a href data-target="#profile" data-toggle="tab" class="nav-link active">Profil</a>
          </li>
          <li class="nav-item">
            <a href data-target="#rooms" data-toggle="tab" class="nav-link">Chambres</a>
          </li>
          <li class="nav-item">
            <a href data-target="#users" data-toggle="tab" class="nav-link">Utilisateurs</a>
          </li>
        </ul>
        <div class="tab-content pb-3">
          <profile></profile>
          <rooms></rooms>
          <users></users>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from "@/components/profile/ManageProfile.vue";
import Avatar from "@/components/profile/ManageAvatar.vue";
import Rooms from "@/components/profile/ManageRooms.vue";
import Users from "@/components/profile/ManageUsers.vue";
export default {
  components: {
    Profile,
    Avatar,
    Rooms,
    Users
  }
};
</script>

<style scoped>
</style>

