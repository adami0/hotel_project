<template>
  <div class="control-section">
    <div class="content-wrapper">
      <ejs-schedule
        id="Schedule"
        ref="ScheduleObj"
        :cssClass="cssClass"
        width="100%"
        height="635px"
        :locale="locale"
        :selectedDate="selectedDate"
        :currentView="currentView"
        :popupOpen="onPopupOpen"
        :timeScale="timeScale"
        :eventSettings="eventSettings"
        :group="group"
        :resourceHeaderTemplate="resourceHeaderTemplate"
        :actionBegin="onActionBegin"
        :renderCell="onRenderCell"
      >
        <e-views>
          <e-view
            option="TimelineMonth"
            :eventTemplate="monthTemplate"
            :allowVirtualScrolling="virtualScroll"
          ></e-view>
        </e-views>
        <e-resources>
          <e-resource
            field="RoomId"
            title="Numéro de chambre"
            name="Rooms"
            allowMultiple="false"
            :dataSource="roomDataSource"
            textField="room_nb"
            idField="id_room"
            colorField="color"
          ></e-resource>
        </e-resources>
      </ejs-schedule>
    </div>
  </div>
</template>

<script>
import {
  TimelineMonth,
  Resize,
  DragAndDrop
} from "@syncfusion/ej2-vue-schedule";
import { extend, isNullOrUndefined, loadCldr } from "@syncfusion/ej2-base";
import resourceHeaderVue from "@/components/calendar/ResourceHeader";
import monthTempVue from "@/components/calendar/MonthHeader";
import { EventBus } from "./../event-bus";

export default {
  data() {
    return {
      cssClass: "room-scheduler",
      locale: "fr",
      virtualScroll: true,
      selectedDate: new Date(),
      timeScale: { enable: true, interval: 60, slotCount: 1 },
      currentView: "TimelineMonth",
      monthTemplate(e) {
        return {
          template: monthTempVue
        };
      },
      resourceHeaderTemplate(e) {
        return {
          template: resourceHeaderVue
        };
      },
      group: {
        enableCompactView: false,
        resources: ["Rooms"]
      }
    };
  },
  provide: {
    schedule: [TimelineMonth, Resize, DragAndDrop]
  },
  methods: {
    onPopupOpen(args) {
      let data = args.data;
      if (
        args.type === "QuickInfo" ||
        args.type === "Editor" ||
        args.type === "RecurrenceAlert" ||
        args.type === "DeleteAlert"
      ) {
        let target =
          args.type === "RecurrenceAlert" || args.type === "DeleteAlert"
            ? data.element[0]
            : args.target;
        if (
          !isNullOrUndefined(target) &&
          target.classList.contains("e-work-cells")
        ) {
          let scheduleObj = this.$refs.ScheduleObj;
          if (
            target.classList.contains("e-read-only-cells") ||
            !scheduleObj.isSlotAvailable(
              data.endTime,
              data.endTime,
              data.groupIndex
            )
          ) {
            args.cancel = true;
          }
        }
      }
    },
    onRenderCell(args) {
      if (
        args.elementType === "emptyCells" &&
        args.element.classList.contains("e-resource-left-td")
      ) {
        let target = args.element.querySelector(".e-resource-text");
        target.innerHTML =
          '<div class="name">Chambres</div><div class="type">Type</div><div class="state">État</div>';
      }
    },
    onActionBegin(args) {
      if (
        args.requestType === "eventCreate" ||
        args.requestType === "eventChange" ||
        args.requestType === "eventRemove"
      ) {
        let data;
        let scheduleObj = this.$refs.ScheduleObj;
        if (
          args.requestType === "eventCreate" ||
          args.requestType === "eventRemove"
        ) {
          data = args.data[0];

          if (
            args.requestType === "eventRemove" &&
            args.requestType !== "eventCreate"
          ) {
            this.$store
              .dispatch("reservations/deleteReservation", data)
              .then(res => {
                EventBus.$emit("message-from-app", {
                  txt: res.data.message,
                  status: "alert-success"
                });
              });
          } else if (
            args.requestType !== "eventRemove" &&
            args.requestType === "eventCreate"
          ) {
            this.$store
              .dispatch("reservations/createNewReservation", data)
              .then(res => {
                EventBus.$emit("message-from-app", {
                  txt: res.data.message,
                  status: "alert-success"
                });
              });
          }
        } else if (args.requestType === "eventChange") {
          data = args.data;
          this.$store
            .dispatch("reservations/updateReservation", data)
            .then(res => {
              EventBus.$emit("message-from-app", {
                txt: res.data.message,
                status: "alert-success"
              });
            });
        }
        let groupIndex = scheduleObj.ej2Instances.eventBase.getGroupIndexFromEvent(
          data
        );
        if (
          !scheduleObj.isSlotAvailable(data.StartTime, data.EndTime, groupIndex)
        ) {
          args.cancel = true;
        }
      }
    }
  },
  computed: {
    eventSettings() {
      return {
        dataSource: this.$store.getters["reservations/getAllReservations"],
        enableTooltip: true,
        fields: {
          id: "Id",
          subject: { title: "Nom et Prénom", name: "Subject" },
          location: { title: "Nombre de nuits", name: "Location" },
          description: { title: "Prix", name: "Description" },
          startTime: { title: "à partir de", name: "StartTime" },
          endTime: { title: "jusqu'à", name: "EndTime" }
        }
      };
    },
    roomDataSource() {
      return this.$store.getters["rooms/roomsData"];
    }
  },
  created() {
    this.$store.dispatch("reservations/getReservationsData");
    this.$store.dispatch("rooms/getRoomsData");
    EventBus.$on("get-roomId", roomStatusData => {
      this.$store
        .dispatch("rooms/updateRoomStatus", roomStatusData)
        .then(response => {
          EventBus.$emit("message-from-app", {
            txt: response.data,
            status: "alert-success"
          });
        });
    });
  }
};
</script>

<style>
.room-scheduler.e-schedule .e-timeline-month-view .e-resource-left-td {
  vertical-align: bottom;
}
.room-scheduler.e-schedule.e-device .e-timeline-month-view .e-resource-left-td {
  width: 75px;
}
.room-scheduler.e-schedule
  .e-timeline-month-view
  .e-resource-left-td
  .e-resource-text {
  display: flex;
  font-weight: 500;
  padding: 0;
}
.room-scheduler.e-schedule
  .e-timeline-month-view
  .e-resource-left-td
  .e-resource-text
  > div {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  flex: 0 0 33.3%;
  font-weight: 500;
  height: 36px;
  line-height: 34px;
}
.room-scheduler.e-schedule
  .e-timeline-month-view
  .e-resource-left-td
  .e-resource-text
  > div:last-child {
  border-right: 0;
}
.room-scheduler.e-schedule .template-wrap {
  display: flex;
  height: 100%;
  width: 100%;
  text-align: left;
}
.room-scheduler.e-schedule .template-wrap .subject {
  flex: auto;
  font-weight: 500;
  padding-left: 10px;
  font-size: 1rem;
  line-height: 36px;
}
.room-scheduler.e-schedule .template-wrap > div {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  flex: 0 0 33.3%;
  font-weight: 500;
  line-height: 57px;
  overflow: hidden;
  padding-left: 5px;
  text-overflow: ellipsis;
}
.room-scheduler.e-schedule .template-wrap > div:last-child {
  border-right: 0;
}
.room-scheduler.e-schedule .e-timeline-month-view .e-resource-cells,
.room-scheduler.e-schedule .e-timeline-month-view .e-resource-cells {
  padding-left: 0;
}
.room-scheduler.e-schedule .e-timeline-month-view .e-date-header-wrap table col,
.room-scheduler.e-schedule .e-timeline-month-view .e-content-wrap table col {
  width: 100px;
}
.room-scheduler.e-schedule .e-read-only {
  opacity: 0.8;
}
.room-scheduler.e-schedule .template-wrap > .room-name,
.room-scheduler.e-schedule .template-wrap > .room-type,
.room-scheduler.e-schedule .template-wrap > .room-state {
  text-align: center;
}
@media (max-width: 550px) {
  .room-scheduler.e-schedule .e-timeline-month-view .e-resource-left-td {
    width: 100px;
  }
  .room-scheduler.e-schedule
    .e-timeline-month-view
    .e-resource-left-td
    .e-resource-text
    > div,
  .room-scheduler.e-schedule .template-wrap > div {
    flex: 0 0 100%;
  }
  .room-scheduler.e-schedule .template-wrap > div:first-child {
    border-right: 0;
  }
  .room-scheduler.e-schedule
    .e-timeline-month-view
    .e-resource-left-td
    .e-resource-text
    > div:first-child {
    border-right: 0;
  }
  .room-scheduler.e-schedule .room-type,
  .room-scheduler.e-schedule .room-state {
    display: none;
  }
}
</style>
