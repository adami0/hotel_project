<template>
  <div class="container py-5">
    <header>
      <nav>
        <ul class="pagination d-flex justify-content-between">
          <li class="page-item">
            <button type="button" class="btn btn-outline-secondary" @click="subtractMonth">
              <font-awesome-icon icon="caret-left" size="lg"/>
              {{ previousMonthAsString | capitalize }}
            </button>
          </li>
          <li class="page-item">
            <button type="button" class="btn btn-outline-secondary" @click="subtractMonth">date</button>
          </li>
          <h2 class="mb-4 text-center">{{ month }} {{ year }}</h2>
          <li class="page-item"></li>
          <li class="page-item">
            <button type="button" class="btn btn-outline-secondary" @click="addMonth">
              {{ nextMonthAsString | capitalize }}
              <font-awesome-icon icon="caret-right" size="lg"/>
            </button>
          </li>
        </ul>
      </nav>
      <div class="row d-none d-sm-flex p-1 bg-dark text-white">
        <h5 class="col-sm p-1 text-center" v-for="(day, index) in days" :key="index">{{ day }}</h5>
      </div>
    </header>
    <div class="row border border-right-0 border-bottom-0">
      <div class="b-calendar__dates">
        <div
          class="date text-right"
          :class="{
          'today': date.today,
          'blank': date.blank,
          'no-border-right': date.key % 7 === 0}"
          v-for="date in dateList"
          :key="date.key"
          :data-date="date.date"
          @click="setSelectedDate(date.moment)"
        >
          <span class="day">{{date.dayNumber}}</span>
          <span class="weekday">{{date.weekDay}}</span>
          <div class="additional" v-show="date.additional">
            <span class="year" v-show="date.additional.year">{{date.additional.year}}</span>
            <span class="month" v-show="date.additional.month">{{date.additional.month}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      today: moment(),
      dateContext: moment(),
      selectedDate: moment(),
      days: [
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
        "Dimanche"
      ]
    };
  },
  computed: {
    year: function() {
      return this.dateContext.format("Y");
    },

    month: function() {
      return this.dateContext.format("MMMM");
    },

    daysInMonth: function() {
      return this.dateContext.daysInMonth();
    },

    currentDate: function() {
      return this.dateContext.get("date");
    },

    firstDayOfMonth: function() {
      let firstDay = moment(this.dateContext).subtract(
        this.currentDate,
        "days"
      );
      return firstDay.weekday();
    },

    previousMonth: function() {
      return moment(this.dateContext).subtract(1, "month");
    },
    previousMonthAsString: function() {
      return this.previousMonth.format("MMMM");
    },
    nextMonth: function() {
      return moment(this.dateContext).add(1, "month");
    },
    nextMonthAsString: function() {
      return this.nextMonth.format("MMMM");
    },

    daysInPreviousMonth: function() {
      return this.previousMonth.daysInMonth();
    },
    daysFromPreviousMonth: function() {
      let daysList = [];
      let count = this.daysInPreviousMonth - this.firstDayOfMonth;
      while (count < this.daysInPreviousMonth) {
        count++;
        daysList[count] = count;
      }

      return daysList.filter(function() {
        return true;
      });
    },

    dateList: function() {
      let $this = this;

      let dateList = [];

      let previousMonth = this.previousMonth;
      let nextMonth = this.nextMonth;

      //dates for display
      let formattedCurrentMonth = this.dateContext.format("MM");
      let formattedCurrentYear = this.year;
      let formattedPreviousMonth = previousMonth.format("MM");
      let formattedPreviousYear = previousMonth.format("Y");
      let formattedNextMonth = nextMonth.format("MM");
      let formattedNextYear = nextMonth.format("Y");

      //counters
      let countDayInCurrentMonth = 0;
      let countDayInPreviousMonth = 0;

      //filling in dates from the previous month
      this.daysFromPreviousMonth.forEach(function(dayFromPreviousMonth) {
        countDayInCurrentMonth++;
        countDayInPreviousMonth++;

        let formattedDay = $this.formattingDay(dayFromPreviousMonth);
        let previousMonth =
          $this.daysFromPreviousMonth.length === countDayInPreviousMonth
            ? $this.previousMonthAsString
            : false;
        let previousYear =
          formattedCurrentYear !== formattedPreviousYear &&
          $this.daysFromPreviousMonth.length === countDayInPreviousMonth
            ? formattedPreviousYear
            : false;
        let additional = {
          month: previousMonth,
          year: previousYear
        };

        if (!previousMonth && !previousYear) {
          additional = false;
        }

        dateList[countDayInCurrentMonth] = {
          key: countDayInCurrentMonth,
          dayNumber: formattedDay,
          date:
            formattedDay +
            "." +
            formattedPreviousMonth +
            "." +
            formattedPreviousYear,
          blank: true,
          today: false,
          additional: additional,
          weekDay: false,
          moment: moment(
            formattedPreviousYear + formattedPreviousMonth + formattedDay
          )
        };
      });

      //filling in dates from the current month
      while (countDayInCurrentMonth < this.firstDayOfMonth + this.daysInMonth) {
        countDayInCurrentMonth++;

        let day = countDayInCurrentMonth - countDayInPreviousMonth;
        let weekDay = this.getWeekDay(countDayInCurrentMonth);
        let formattedDay = this.formattingDay(day);

        dateList[countDayInCurrentMonth] = {
          key: countDayInCurrentMonth,
          dayNumber: formattedDay,
          date:
            formattedDay +
            "." +
            formattedCurrentMonth +
            "." +
            formattedCurrentYear,
          blank: false,
          today:
            formattedDay === this.initialDate &&
            this.todayInCurrentMonthAndYear,
          additional: false,
          weekDay: weekDay,
          moment: moment(
            formattedCurrentYear + formattedCurrentMonth + formattedDay
          )
        };
      }

      let daysInNextMonth = 7 - (countDayInCurrentMonth % 7);
      let countDayInCurrentMonthSaved = countDayInCurrentMonth;
      let day = 0;

      //filling in dates from the next month
      if (daysInNextMonth < 7) {
        while (
          countDayInCurrentMonth <
          countDayInCurrentMonthSaved + daysInNextMonth
        ) {
          countDayInCurrentMonth++;
          day++;

          let formattedDay = this.formattingDay(day);
          let nextMonth = day === 1 ? this.nextMonthAsString : false;
          let nextYear =
            formattedCurrentYear !== formattedNextYear && day === 1
              ? formattedNextYear
              : false;
          let additional = {
            month: nextMonth,
            year: nextYear
          };

          if (!nextMonth && !nextYear) {
            additional = false;
          }

          dateList[countDayInCurrentMonth] = {
            key: countDayInCurrentMonth,
            dayNumber: formattedDay,
            date:
              formattedDay + "." + formattedNextMonth + "." + formattedNextYear,
            blank: true,
            today: false,
            additional: additional,
            weekDay: false,
            moment: moment(
              formattedNextYear + formattedNextMonth + formattedDay
            )
          };
        }
      }

      return dateList.filter(function() {
        return true;
      });
    },

    initialDate: function() {
      return this.formattingDay(this.today.get("date"));
    },
    initialMonth: function() {
      return this.today.format("MMMM");
    },
    initialYear: function() {
      return this.today.format("Y");
    },
    todayInCurrentMonthAndYear: function() {
      return this.month === this.initialMonth && this.year === this.initialYear;
    },
    selectedDayAndMonth: function() {
      let dayAndMonth = this.selectedDate.format("D MMMM");
      dayAndMonth = dayAndMonth.split(" ");
      dayAndMonth = {
        day: dayAndMonth[0],
        month: dayAndMonth[1]
      };

      return dayAndMonth;
    },
    selectedWeekDay: function() {
      return this.selectedDate.format("dddd");
    },
    todayIsEqualSelectDate: function() {
      return (
        this.selectedDate.format("YYYYMMDD") === this.today.format("YYYYMMDD")
      );
    }
  },
  methods: {
    addMonth: function() {
      this.dateContext = this.nextMonth;
    },
    subtractMonth: function() {
      this.dateContext = this.previousMonth;
    },
    setSelectedDate: function(moment) {
      this.selectedDate = moment;
    },
    goToday: function() {
      this.selectedDate = this.today;
      this.dateContext = this.today;
    },
    formattingDay(day) {
      return ("0" + day).slice(-2);
    },
    getWeekDay(day) {
      let index = day;
      if (index > 7) {
        index %= 7;
      }
      index = index === 0 ? 6 : index - 1;
      return this.days[index];
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style scoped>
@media (max-width: 480px) {
  .b-calendar__dates .date {
    width: 100%;
    text-align: left !important;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
  }
  .b-calendar__dates .date.blank {
    display: none;
  }
  .b-calendar__dates .date .weekday {
    display: block;
    margin-left: 0.25rem;
  }
}
@media (min-width: 576px) {
  .b-calendar__dates {
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }
  .b-calendar__dates:after {
    content: "";
    position: absolute;
    bottom: 0;
    background-color: #fff;
    height: 1px;
    width: 100%;
    z-index: 1;
  }
  .b-calendar__dates .date {
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    font-weight: 200;
    min-height: 4.5rem;
    padding: 0.25rem 0.5rem;
    position: relative;
    width: calc(100% / 7);
  }
  .b-calendar__dates .date.blank {
    background-color: rgba(0, 0, 0, 0.02);
    color: rgba(0, 0, 0, 0.2);
  }
  .b-calendar__dates .date.no-border-right {
    border-right: none;
  }
  .b-calendar__dates .date.today .day {
    background: red;
    font-weight: bold;
    height: 30px;
    width: 30px;
    display: inline-block;
    text-align: center;
    line-height: 30px;
    color: white;
    border-radius: 50%;
  }
  .b-calendar__dates .date .weekday {
    display: none;
  }
  .b-calendar__dates .date .additional {
    font-size: 0.75em;
    position: absolute;
    bottom: 0.25rem;
    left: 0.5rem;
  }
  .b-calendar__dates .date .additional .year {
    padding-right: 0.25rem;
    font-size: 0.75em;
  }
  .date.text-right:hover {
    background: #c09a73;
    cursor: pointer;
  }
}
</style>
