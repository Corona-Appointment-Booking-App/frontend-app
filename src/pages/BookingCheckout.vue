<template>
  <b-container class="py-5">
    <b-row class="justify-content-center no-scrollbar">
      <h2>Ausgewähltes Test Zentrum</h2>
      <b-col md="10">
        <h5>{{ this.loadedBookingIndex.testCenter.name }}</h5>
        <h5>{{ this.loadedBookingIndex.testCenter.address }}</h5>
      </b-col>

      <BookingModal
        :selectedTestCenter="this.loadedBookingIndex.testCenter"
        :selectedOpeningDayDate="this.getSelectedOpeningDayDate()"
        :selectedOpeningTime="this.getSelectedOpeningTime()"
      />

      <b-col
        v-for="availableOpeningTime in loadedBookingIndex.availableOpeningTimes"
        :key="availableOpeningTime.id"
        md="6"
      >
        <b-row class="justify-content-center mt-3">
          <b-button
            v-if="!availableOpeningTime.isBookedOut"
            variant="primary"
            class="col-6 d-flex justify-content-center align-items-center p-4 text-center"
            @click="onClickAvailableOpeningTime(availableOpeningTime)"
          >
            um
            {{ availableOpeningTime.time }} Uhr
          </b-button>

          <b-button
            v-else
            variant="danger"
            class="col-6 d-flex justify-content-center align-items-center p-4 text-center"
            @click="onClickExistingBookingTime"
          >
            um
            {{ availableOpeningTime.time }} Uhr
          </b-button>
        </b-row>
      </b-col>
    </b-row>

    <b-row class="justify-content-center no-scrollbar mt-5">
      <b-col md="10">
        <router-link
          class="text-decoration-none"
          :to="{
            name: 'testCenter',
            params: { testCenterId: this.loadedBookingIndex.testCenter.id },
          }"
          ><b-button class="btn-block" variant="outline-primary"
            >Zurück zur Übersicht</b-button
          ></router-link
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { createBookingApiService } from "@/service/booking.api.service.factory";
import BookingModal from "@/components/BookingModal";
import SwalWithBootstrapButtons from "@/swal-with-bootstrap-buttons";

export default {
  components: {
    BookingModal,
  },
  methods: {
    onClickAvailableOpeningTime(availableOpeningTime) {
      this.selectedOpeningTime = availableOpeningTime.time;
      this.$bvModal.show("modal-booking");
    },
    onClickExistingBookingTime() {
      SwalWithBootstrapButtons.fire({
        title: "Fehler!",
        text: "Leider gibt es zu dieser Uhrzeit bereits eine Buchung",
        icon: "error",
        confirmButtonText: "Verstanden",
      });
    },
    getSelectedOpeningDayDate() {
      return localStorage.getItem("selectedOpeningDayDate") || "";
    },
    getSelectedOpeningTime() {
      return this.selectedOpeningTime;
    },
  },
  data() {
    return {
      loadedBookingIndex: {},
      bookingApiService: null,
      selectedOpeningTime: "",
    };
  },
  created() {
    this.bookingApiService = createBookingApiService();
    this.bookingApiService
      .loadBookingCheckout(
        localStorage.getItem("selectedTestCenterId"),
        localStorage.getItem("selectedOpeningDayDate")
      )
      .then((response) => {
        this.loadedBookingIndex = response.loadedBookingIndex;
      })
      .catch(() => {
        this.$router.push({ name: "index" });
      });
  },
};
</script>
