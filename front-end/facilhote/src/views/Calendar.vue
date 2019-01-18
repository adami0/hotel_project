<template>
  <div>
    <!-- <Search></Search> -->
    <full-calendar
      class="test-fc"
      :events="fcEvents"
      first-day="1"
      locale="fr"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick"
      @moreClick="moreClick"
    >
      <template slot="fc-event-card" scope="p">
        <p>
          <font-awesome-icon icon="bed" size="sm"/>
          {{ p.event.title }}
        </p>
      </template>
    </full-calendar>
  </div>
</template>

<script>
import FullCalendar from "@/components/calendar/FullCalendar.vue";
import Search from "@/components/search/Search.vue";
export default {
  components: {
    FullCalendar,
    Search
  },
  data() {
    return {
      fcEvents: [
        {
          id: 1,
          title: "Sunny 725-727",
          start: "2018-12-10",
          end: "2018-12-15",
          cssClass: "family"
        },
        {
          id: 2,
          title: "Toto 726-727",
          start: "2018-12-16",
          end: "2018-12-18",
          cssClass: ["home", "work"]
        },
        {
          id: 3,
          title: "Titi 2/27-2/28",
          start: "2018-12-24",
          end: "2018-12-28"
        },
        {
          id: 4,
          title: "Titi 2/27-2/28",
          start: "2018-12-24",
          end: "2018-12-28"
        },
        {
          id: 5,
          title: "Titi 2/27-2/28",
          start: "2018-12-24",
          end: "2018-12-28"
        },
        {
          id: 6,
          title: "Titi 2/27-2/28",
          start: "2018-12-24",
          end: "2018-12-28"
        }
      ]
    };
  },
  methods: {
    changeMonth(start, end, current) {
      console.log(
        "changeMonth",
        start.format(),
        end.format(),
        current.format()
      );
    },
    eventClick(event, jsEvent, pos) {
      console.log("eventClick", event, jsEvent, pos);
    },
    dayClick(day, jsEvent) {
      console.log("dayClick", day, jsEvent);
    },
    moreClick(day, events, jsEvent) {
      console.log("moreCLick", day, events, jsEvent);
    }
  }
};
</script>

