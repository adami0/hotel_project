<template>
  <div class="col-lg-3 text-xs-center">
    <Progress-bar
      :diameter="130"
      :strokeWidth="4"
      :completed-steps="completedSteps"
      :total-steps="totalSteps"
      class="is-hidden"
    >
      <img
        v-if="$store.state.users.user.avatar"
        :src="this.$store.state.users.avatar"
        height="120px"
        width="120px"
        class="rounded avatar mx-auto d-block"
        alt="avatar"
      >
      <img
        v-else
        src="@/assets/avatar.svg"
        height="120px"
        width="120px"
        class="rounded avatar mx-auto d-block"
        alt="avatar"
      >
    </Progress-bar>
    <h6 class="my-3">Modifier la photo de profil</h6>
    <form ref="avatar" @change="uploadAvatar($event)" enctype="multipart/form-data">
      <div class="form-group">
        <input type="file" name="avatar" accept="image/*" class="form-control-file">
      </div>
    </form>
  </div>
</template>

<script>
import { EventBus } from "./../../event-bus.js";
import ProgressBar from "./Progress";
export default {
  components: {
    ProgressBar
  },
  data() {
    return {
      completedSteps: 0,
      totalSteps: 10
    };
  },
  methods: {
    checkMimeType(type) {
      const isAuthorized = [
        "image/gif",
        "image/jpeg",
        "image/png",
        "image/svg+xml"
      ].find(mime => {
        return mime === type;
      });
      return Boolean(isAuthorized);
    },
    uploadAvatar(evt) {
      const imageFile = evt.target.files[0] || evt.srcElement.files[0];
      const checked =
        this.checkMimeType(imageFile.type) && imageFile.size <= 1024 * 1024 * 2;
      if (checked) {
        const formData = new FormData();
        formData.append("avatar", imageFile);
        if (this.$store.state.users.user.avatar) {
          formData.append("url", this.$store.state.users.user.avatar);
        }
        this.$store
          .dispatch("users/updateUserAvatar", formData)
          .then(percentLoaded => {
            this.completedSteps = percentLoaded;
            this.$store.dispatch(
              "users/getUserAvatar",
              this.$store.state.users.user.avatar
            );
          });
      } else {
        EventBus.$emit("message-from-app", {
          txt: "Le format de fichier n'est pas valide (png ou jpeg)",
          status: "alert-warning"
        });
      }
    }
  }
};
</script>

<style scoped>
.avatar {
  border-radius: 50% !important;
}
</style>
