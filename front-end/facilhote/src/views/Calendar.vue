<template>
  <div class="control-section">
    <div class="content-wrapper">
      <ejs-schedule
        id="Schedule"
        ref="ScheduleObj"
        :cssClass="cssClass"
        width="100%"
        height="650px"
        :locale="locale"
        :selectedDate="selectedDate"
        :currentView="currentView"
        :eventSettings="eventSettings"
        :group="group"
        :resourceHeaderTemplate="resourceHeaderTemplate"
        :popupOpen="onPopupOpen"
        :eventRendered="onEventRendered"
        :actionBegin="onActionBegin"
        :renderCell="onRenderCell"
      >
        <e-views>
          <e-view option="TimelineDay"></e-view>
          <e-view option="TimelineWeek"></e-view>
          <e-view option="TimelineMonth"></e-view>
        </e-views>
        <e-resources>
          <e-resource
            field="RoomId"
            title="Room Type"
            name="MeetingRoom"
            allowMultiple="true"
            :dataSource="meetingRoomDataSource"
            textField="text"
            idField="id"
            colorField="color"
          ></e-resource>
        </e-resources>
      </ejs-schedule>
    </div>
  </div>
</template>

<script>
import resourceHeaderVue from "@/components/calendar/ResourceHeader";
import { extend, isNullOrUndefined, loadCldr } from "@syncfusion/ej2-base";
import { roomData } from "./../datasource";
import {
  SchedulePlugin,
  TimelineViews,
  TimelineMonth,
  Resize,
  DragAndDrop
} from "@syncfusion/ej2-vue-schedule";

export default {
  data() {
    return {
      cssClass: "room-scheduler",
      locale: "fr",
      eventSettings: {
        dataSource: extend([], roomData, null, true),
        fields: {
          id: "Id",
          subject: { title: "Nom", name: "Subject" },
          location: { title: "Prénom", name: "Location" },
          description: { title: "Comentaires", name: "Description" },
          startTime: { title: "à partir de", name: "StartTime" },
          endTime: { title: "jusqu'à", name: "EndTime" }
        }
      },
      selectedDate: new Date(2018, 7, 1),
      currentView: "TimelineWeek",
      // workHours: { start: "08:00", end: "18:00" },
      // timeScale: { interval: 60, slotCount: 1 },
      resourceHeaderTemplate: function(e) {
        return {
          template: resourceHeaderVue
        };
      },
      group: {
        enableCompactView: false,
        resources: ["MeetingRoom"]
      },
      meetingRoomDataSource: [
        {
          text: "101",
          id: 1,
          color: "#ea7a57",
          state: 20,
          type: "Simple"
        },
        { text: "102", id: 2, color: "#7fa900", state: 7, type: "Triple" },
        { text: "103", id: 3, color: "#5978ee", state: 5, type: "Simple" },
        {
          text: "104",
          id: 4,
          color: "#fec200",
          state: 15,
          type: "Double"
        },
        {
          text: "201",
          id: 5,
          color: "#df5286",
          state: 25,
          type: "Simple"
        },
        {
          text: "202",
          id: 6,
          color: "#00bdae",
          state: 10,
          type: "Triple"
        },
        {
          text: "203",
          id: 7,
          color: "#865fcf",
          state: 20,
          type: "Simple"
        },
        {
          text: "204",
          id: 8,
          color: "#1aaa55",
          state: 8,
          type: "Triple"
        },
        {
          text: "301",
          id: 9,
          color: "#df5286",
          state: 30,
          type: "Double"
        },
        {
          text: "302",
          id: 10,
          color: "#710193",
          state: 25,
          type: "Double"
        }
      ]
    };
  },
  provide: {
    schedule: [TimelineViews, TimelineMonth, Resize, DragAndDrop]
  },
  methods: {
    isReadOnly: function(endDate) {
      return endDate < new Date(2018, 6, 31, 0, 0);
    },
    onPopupOpen: function(args) {
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
        } else if (
          !isNullOrUndefined(target) &&
          target.classList.contains("e-appointment") &&
          this.isReadOnly(data.EndTime)
        ) {
          args.cancel = true;
        }
      }
    },
    onRenderCell: function(args) {
      if (args.element.classList.contains("e-work-cells")) {
        if (args.date < new Date(2018, 6, 31, 0, 0)) {
          args.element.setAttribute("aria-readonly", "true");
          args.element.classList.add("e-read-only-cells");
        }
      }
      if (
        args.elementType === "emptyCells" &&
        args.element.classList.contains("e-resource-left-td")
      ) {
        let target = args.element.querySelector(".e-resource-text");
        target.innerHTML =
          '<div class="name">Chambres</div><div class="type">Type</div><div class="state">État</div>';
      }
    },
    onEventRendered: function(args) {
      if (this.isReadOnly(args.data.EndTime)) {
        args.element.setAttribute("aria-readonly", "true");
        args.element.classList.add("e-read-only");
      }
    },
    onActionBegin: function(args) {
      if (
        args.requestType === "eventCreate" ||
        args.requestType === "eventChange"
      ) {
        let data;
        let scheduleObj = this.$refs.ScheduleObj;
        if (args.requestType === "eventCreate") {
          data = args.data[0];
        } else if (args.requestType === "eventChange") {
          data = args.data;
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
  }
};
</script>

<style>
.room-scheduler.e-schedule .e-timeline-view .e-resource-left-td {
  vertical-align: bottom;
}
.room-scheduler.e-schedule.e-device .e-timeline-view .e-resource-left-td {
  width: 75px;
}
.room-scheduler.e-schedule
  .e-timeline-view
  .e-resource-left-td
  .e-resource-text {
  display: flex;
  font-weight: 500;
  padding: 0;
}
.room-scheduler.e-schedule
  .e-timeline-view
  .e-resource-left-td
  .e-resource-text
  > div {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  flex: 0 0 33.3%;
  font-weight: 500;
  height: 36px;
  line-height: 34px;
  padding-left: 5px;
}
.room-scheduler.e-schedule
  .e-timeline-view
  .e-resource-left-td
  .e-resource-text
  > div:last-child {
  border-right: 0;
}
.room-scheduler.e-schedule .template-wrap {
  display: flex;
  height: 100%;
  text-align: left;
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
.room-scheduler.e-schedule .e-timeline-view .e-resource-cells,
.room-scheduler.e-schedule .e-timeline-month-view .e-resource-cells {
  padding-left: 0;
}
.room-scheduler.e-schedule .e-timeline-view .e-date-header-wrap table col,
.room-scheduler.e-schedule .e-timeline-view .e-content-wrap table col {
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
  .room-scheduler.e-schedule .e-timeline-view .e-resource-left-td {
    width: 100px;
  }
  .room-scheduler.e-schedule
    .e-timeline-view
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
    .e-timeline-view
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
