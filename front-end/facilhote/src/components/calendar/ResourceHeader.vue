<template>
  <div class="template-wrap">
    <div class="room-name">{{data.resourceData.room_nb}}</div>
    <div class="room-type">{{data.resourceData.room_type}}</div>
    <div @click="updateRoomStatus" :style="roomStatusBackground" class="room-state text-white">
      <font-awesome-icon :icon="['fa', roomStatusIcon ]" size="lg"/>
    </div>
  </div>
</template>

<script>
import { EventBus } from "./../../event-bus";
export default {
  data() {
    return {
      data: {},
      roomStatusIcon: "check-circle",
      roomStatusBackground: {
        backgroundColor: "#2ed573"
      }
    };
  },
  mounted() {
    this.roomStatusIcon = this.data.resourceData.room_status
      ? "check-circle"
      : "times-circle";
    this.roomStatusBackground.backgroundColor = this.data.resourceData
      .room_status
      ? "#2ed573"
      : "#ff4757";
  },
  methods: {
    updateRoomStatus() {
      const roomStatus = this.data.resourceData.room_status;
      const roomId = this.data.resourceData.id_room;
      // send room status and roomId to parent
      EventBus.$emit("get-roomId", { roomStatus: !roomStatus, roomId: roomId });
    }
  }
};
</script>

<style scoped>
.room-state {
  cursor: pointer;
}
.room-name {
  font-size: 1rem;
}
.room-state:hover {
  opacity: 0.7;
}
</style>

