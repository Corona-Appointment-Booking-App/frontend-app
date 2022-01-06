<template>
  <div>
    <b-modal
      id="modal-booking"
      hide-footer
      :title="modalTitle"
      size="lg"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="booking-modal-form" @submit.stop.prevent="handleSubmit">
        <div class="mb-2">
          <b-row>
            <b-col md="12">
              <b-form-group
                label="Ich möchte Buchen für:"
                label-for="name-input"
              >
                <b-form-select
                  v-model="selectedTotalParticipants"
                  :options="availableParticipants"
                  size="sm"
                  class="mt-3"
                >
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </div>

        <div
          v-for="(selectedTotalParticipant, index) in selectedTotalParticipants"
          :key="`participant-${selectedTotalParticipant}`"
        >
          <b-alert variant="info" show
            ><strong>{{ selectedTotalParticipant }}. Besucher</strong></b-alert
          >
          <b-row>
            <b-col md="6">
              <b-form-group
                label="Vorname*"
                :label-for="`first-name-input-${index}`"
              >
                <b-form-input
                  :id="`first-name-input-${index}`"
                  v-model="submittedParticipants[index]['firstName']"
                  placeholder="Vorname"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Nachname*"
                :label-for="`last-name-input-${index}`"
              >
                <b-form-input
                  :id="`last-name-input-${index}`"
                  v-model="submittedParticipants[index]['lastName']"
                  placeholder="Nachname"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="6">
              <b-form-group
                label="Postleitzahl*"
                :label-for="`zip-code-input-${index}`"
              >
                <b-form-input
                  :id="`zip-code-input-${index}`"
                  v-model="submittedParticipants[index]['zipCode']"
                  placeholder="Postleitzahl"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group label="Ort*" :label-for="`city-input-${index}`">
                <b-form-input
                  :id="`city-input-${index}`"
                  v-model="submittedParticipants[index]['city']"
                  placeholder="Ort"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="6">
              <b-form-group
                label="Geburtsdatum*"
                :label-for="`birth-date-input-${index}`"
              >
                <b-form-input
                  :id="`birth-date-input-${index}`"
                  v-model="submittedParticipants[index]['birthDate']"
                  placeholder="tt.mm.jjjj"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Telefonnummer*"
                :label-for="`phone-number-input-${index}`"
              >
                <b-form-input
                  :id="`phone-number-input-${index}`"
                  v-model="submittedParticipants[index]['phoneNumber']"
                  placeholder="Telefonnummer"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="6">
              <b-form-group
                label="Straße*"
                :label-for="`street-input-${index}`"
              >
                <b-form-input
                  :id="`street-input-${index}`"
                  v-model="submittedParticipants[index]['street']"
                  placeholder="Straße"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Hausnummer*"
                :label-for="`house-number-${index}`"
              >
                <b-form-input
                  :id="`house-number-${index}`"
                  v-model="submittedParticipants[index]['houseNumber']"
                  placeholder="Hausnummer"
                  type="number"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group
            label="E-Mail-Adresse für Testergebnis*"
            :label-for="`email-${index}`"
          >
            <b-form-input
              :id="`email-${index}`"
              v-model="submittedParticipants[index]['email']"
              placeholder="E-Mail-Adresse für Testergebnis"
              type="email"
              required
            ></b-form-input>
          </b-form-group>
          <hr />
        </div>

        <small>* Pflichtfelder</small>

        <b-button type="submit" class="mt-3" variant="primary" block
          >Jetzt Buchen</b-button
        >
      </form>
    </b-modal>
  </div>
</template>

<script>
import { createBookingApiService } from "@/service/booking.api.service.factory";
import {
  API_ERROR_UNEXPECTED_ERROR,
  API_ERROR_VALIDATION,
  API_ERROR_BOOKING_EXISTS,
  API_ERROR_BOOKING_NOT_ALLOWED,
} from "@/api.const";
import SwalWithBootstrapButtons from "@/swal-with-bootstrap-buttons";

export default {
  data() {
    return {
      selectedTotalParticipants: 1,
      maxParticipants: 5,
      bookingApiService: null,
      swalWithBootstrapButtons: null,
      isErrorBookingExists: false,
      defaultParticipantData: {
        firstName: null,
        lastName: null,
        zipCode: null,
        city: null,
        birthDate: null,
        phoneNumber: null,
        street: null,
        houseNumber: null,
        email: null,
      },
      submittedParticipants: [
        {
          firstName: null,
          lastName: null,
          zipCode: null,
          city: null,
          birthDate: null,
          phoneNumber: null,
          street: null,
          houseNumber: null,
          email: null,
        },
        {
          firstName: null,
          lastName: null,
          zipCode: null,
          city: null,
          birthDate: null,
          phoneNumber: null,
          street: null,
          houseNumber: null,
          email: null,
        },
        {
          firstName: null,
          lastName: null,
          zipCode: null,
          city: null,
          birthDate: null,
          phoneNumber: null,
          street: null,
          houseNumber: null,
          email: null,
        },
        {
          firstName: null,
          lastName: null,
          zipCode: null,
          city: null,
          birthDate: null,
          phoneNumber: null,
          street: null,
          houseNumber: null,
          email: null,
        },
        {
          firstName: null,
          lastName: null,
          zipCode: null,
          city: null,
          birthDate: null,
          phoneNumber: null,
          street: null,
          houseNumber: null,
          email: null,
        },
      ],
      availableParticipants: [
        { value: 1, text: "Für einen Besucher" },
        { value: 2, text: "Für zwei Besucher" },
        { value: 3, text: "Für drei Besucher" },
        { value: 4, text: "Für vier Besucher" },
        { value: 5, text: "Für fünf Besucher" },
      ],
    };
  },
  created() {
    this.bookingApiService = createBookingApiService();
  },
  props: {
    selectedTestCenter: Object,
    selectedOpeningDayDate: String,
    selectedOpeningTime: String,
  },
  computed: {
    modalTitle: function () {
      return `${this.selectedTestCenter.name}, ${this.selectedOpeningDayDate} um ${this.selectedOpeningTime} Uhr`;
    },
  },
  methods: {
    resetModal() {
      this.selectedTotalParticipants = 1;
      this.submittedParticipants = [
        {
          firstName: null,
          lastName: null,
          zipCode: null,
          city: null,
          birthDate: null,
          phoneNumber: null,
          street: null,
          houseNumber: null,
          email: null,
        },
        {
          firstName: null,
          lastName: null,
          zipCode: null,
          city: null,
          birthDate: null,
          phoneNumber: null,
          street: null,
          houseNumber: null,
          email: null,
        },
        {
          firstName: null,
          lastName: null,
          zipCode: null,
          city: null,
          birthDate: null,
          phoneNumber: null,
          street: null,
          houseNumber: null,
          email: null,
        },
        {
          firstName: null,
          lastName: null,
          zipCode: null,
          city: null,
          birthDate: null,
          phoneNumber: null,
          street: null,
          houseNumber: null,
          email: null,
        },
        {
          firstName: null,
          lastName: null,
          zipCode: null,
          city: null,
          birthDate: null,
          phoneNumber: null,
          street: null,
          houseNumber: null,
          email: null,
        },
      ];
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    async handleSubmit() {
      let filteredParticipants = [];
      this.submittedParticipants.forEach((participant) => {
        for (let requiredPropertyName in this.defaultParticipantData) {
          if (
            participant[requiredPropertyName] === null ||
            participant[requiredPropertyName] === ""
          ) {
            return;
          }
        }

        filteredParticipants.push(participant);
      });

      const token = await this.bookingApiService.bookingFetchToken(
        filteredParticipants,
        this.selectedTestCenter.id,
        this.selectedOpeningDayDate,
        this.selectedOpeningTime
      );

      await this.bookingApiService
        .bookingFinalize(
          filteredParticipants,
          token,
          this.selectedTestCenter.id,
          this.selectedOpeningDayDate,
          this.selectedOpeningTime
        )
        .then(async () => {
          await SwalWithBootstrapButtons.fire({
            title: "Erfolg!",
            text: "Die Buchung war erfolgreich",
            icon: "success",
            timer: 5000,
          });

          this.resetModal();
          this.$router.go();
        })
        .catch((error) => {
          let errorMessage = error.response.data.error;

          if (
            errorMessage === API_ERROR_UNEXPECTED_ERROR ||
            errorMessage === API_ERROR_BOOKING_NOT_ALLOWED
          ) {
            SwalWithBootstrapButtons.fire({
              title: "Fehler!",
              text: "Buchung nicht möglich bitte versuchen Sie es später nochmal",
              icon: "error",
              confirmButtonText: "Verstanden",
            });
          }

          if (errorMessage === API_ERROR_VALIDATION) {
            SwalWithBootstrapButtons.fire({
              title: "Fehler!",
              text: "Bitte überprüfen Sie nochmals alle Felder",
              icon: "error",
              confirmButtonText: "Verstanden",
            });
          }

          if (errorMessage === API_ERROR_BOOKING_EXISTS) {
            SwalWithBootstrapButtons.fire({
              title: "Fehler!",
              text: "Leider gibt es zu dieser Uhrzeit bereits eine Buchung",
              icon: "error",
              confirmButtonText: "Verstanden",
            });
          }
        });
    },
  },
};
</script>
