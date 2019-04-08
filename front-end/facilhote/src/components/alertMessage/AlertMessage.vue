<template lang="html">
  <div id="app-alert-message"
    v-if="message"
    :class="'alert alert-dismissible ' + msgShow + ' '+ messageStatus"
    role="alert">
    {{ message }}
    <button type="button" class="close" @click="closeMessage()" aria-label="close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
import { EventBus } from "./../../event-bus.js";
export default {
  created() {
    EventBus.$on("message-from-app", msg => {
      this.setMessageStyle(msg);
      this.message = typeof msg === "object" && msg !== null ? msg.txt : msg;
    });
  },
  data() {
    return {
      message: null,
      messageStatus: null,
      msgShow: null
    };
  },
  methods: {
    setMessageStyle(msg) {
      const statuses = [
        "alert-danger",
        "alert-success",
        "alert-warning",
        "alert-primary",
        "alert-info"
      ];
      if (typeof msg !== "object") return;
      if (!msg || !msg.status) return;
      this.msgShow = "show";
      this.messageStatus = statuses.find(s => {
        return s === msg.status;
      });
      setTimeout(
        function() {
          this.message = null;
        }.bind(this),
        3000
      );
    },
    closeMessage() {
      this.message = null;
      this.msgShow = null;
    }
  }
};
</script>

<style lang="css">
#app-alert-message {
  position: absolute;
  top: 60px;
  right: 5px;
  z-index: 100;
  animation-name: message;
  animation-duration: 0.5s;
  -webkit-animation-name: message; /* Safari 4.0 - 8.0 */
  -webkit-animation-duration: 0.5s;
}
@-webkit-keyframes message {
  0% {
    right: -50%;
  }
  100% {
    right: 5px;
  }
}
@keyframes message {
  0% {
    right: -50%;
  }
  100% {
    right: 5px;
  }
}
</style>
