<template>
  <div class="calendar-app">
    <div class="calendar">
      <FullCalendar :options="calendarOptions" />
      <!-- Modal  Details Event -->
      <button
        ref="role-modal"
        type="button"
        style="visibility: hidden"
        data-mdb-toggle="modal"
        data-mdb-target="#exampleModal"
      ></button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="details">
              <h2>Détails de l'événement</h2>
              <p>Id:{{ show_events.id }}</p>
              <p>Title:{{ show_events.title }}</p>
              <p>Start:{{ show_events.start }}</p>
              <p>End:{{ show_events.end }}</p>
            </div>
            <div class="edit">
              <h4>Modifier l'événement :</h4>
              <div class="__form">
                <input
                  type="text"
                  v-model="event_edit.title"
                  class="__input"
                  placeholder="Titre"
                  required
                />
              </div>
              <div class="__form">
                <input
                  type="date"
                  v-model="event_edit.start"
                  class="__input"
                  required
                />
              </div>
              <div class="__form">
                <input
                  type="datetime-local"
                  v-model="event_edit.end"
                  class="__input"
                  required
                />
              </div>
              <button
                class="main-button-slider"
                type="submit"
                @click="UpdateEvent"
              >
                <i class="fa fa-pencil" aria-hidden="true"></i>
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import moment from 'moment';

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      show_events: {},
      event_edit: {
        id: null,
        start: null,
        end: null,
        title: null,
      },
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin],
        headerToolbar: {
          left: "title",
          center: "prev today next",
          right: "dayGridMonth, timeGridWeek, timeGridDay, listWeek",
        },
        buttonText: {
          today: "Aujourd'hui",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
          list: "Liste",
        },
        selectable: true,
        weekends: true,
        events: this.$store.getters.Events,
        select: this.handleSelect,
        eventClick: this.handleClick,
      },
    };
  },
  computed: {},
  methods: {
    handleSelect: function (arg) {
      this.$store.commit("ADD_EVENT", {
        id: new Date().getTime(),
        title: "arwa test",
        start: arg.start,
        end: arg.end,
        allDay: arg.allDay,
      });
    },
    formatDate:function(date){
      return moment(String(date)).format('DD/MM/YYYY hh:mm');
    },
    handleClick: function (arg) {
      this.show_events = arg.event;
      this.event_edit.end=this.formatDate(this.show_events.end);
      this.event_edit.title=this.show_events.title;
      this.event_edit.start=moment(this.show_events.start).format('YYYY-MM-DD hh:mm');
      // this.event_edit.start=this.formatDate(this.show_events.start);
      console.log(this.formatDate(this.show_events.start));
      this.$refs["role-modal"].click();
    },
    UpdateEvent: function () {
      this.$store.commit("UPDATE_EVENT", {
        id: this.show_event.id,
        title: this.event_edit.title,
        start: this.event_edit.start,
        end: this.event_edit.end,
      });
    },
  },
};
</script>
<style scoped>
.main-button-slider {
  border: 0px;
  font-size: 13px;
  border-radius: 20px;
  padding: 12px 20px;
  margin-bottom: 10px;
  margin-right: 2%;
  /* background-color: #666464; */
  letter-spacing: 0.25px;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  float: right;
}
.__form {
  padding: 10px 0px;
  position: relative;
  margin-left: -10%;
}
input.__input.form-control {
  margin-left: 14%;
}
.__input {
  border: none;
  border-bottom: 2px solid #d1d1d4;
  background: none;
  padding: 10px;
  padding-left: 24px;
  color: #656566;
  width: 75%;
  transition: 0.2s;
}

.__input:active,
.__input:focus,
.__input:hover {
  outline: none;
  border-bottom-color: #ffb6c1;
}

h4 {
  text-align: left;
  margin-left: 10px;
  color: #666464;
}
.details {
  margin-top: 10px;
}
p {
  /* font-family: serif; */
  font-size: 16px;
  text-align: left;
  margin-left: 10px;
}
.calendar {
  margin-top: 7px;
  padding: 3%;
}
.caledndar-app {
  background-color: rgba(255, 255, 255, 0.4);
}
.modal-dialog {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
