<template>
  <div class="tab-pane active" id="profile">
    <h4 class="my-2">Votre profil utilisateur</h4>
    <div class="row">
      <div class="col-md-12">
        <p class="todo-list">{{ $store.state.users.user.about }}</p>
      </div>
      <div class="col-md-12">
        <h4 class="mt-2">
          <font-awesome-icon icon="list" size="lg"/>
          <span class="pl-3">To-do list</span>
        </h4>
        <table class="table table-hover table-striped">
          <tbody>
            <tr>
              <td>
                <strong>Abby</strong> joined ACME Project Team in
                <strong>`Collaboration`</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Gary</strong> deleted My Board1 in
                <strong>`Discussions`</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Kensington</strong> deleted MyBoard3 in
                <strong>`Discussions`</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>John</strong> deleted My Board1 in
                <strong>`Discussions`</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Skell</strong> deleted his post Look at Why this is.. in
                <strong>`Discussions`</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.todo-liste {
  cursor: pointer;
}
</style>

