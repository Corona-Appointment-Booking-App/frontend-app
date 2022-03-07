<template>
  <b-container class="py-5">
    <b-card-group deck class="mb-3">
      <b-card header="Termin stornieren" class="text-center">
        <b-card-text>
          <p>
            <strong class="text-primary"
              >Testzentrum: {{ loadedBooking.testCenter.name }}</strong
            >
          </p>
          <p>{{ loadedBooking.testCenter.address }}</p>
          <p>Datum: {{ loadedBooking.formattedTime }} Uhr</p>

          <b-button variant="primary" @click="bookingCancel"
            >Jetzt stornieren</b-button
          >
        </b-card-text>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
import { createBookingApiService } from "@/service/booking.api.service.factory";
import SwalWithBootstrapButtons from "@/swal-with-bootstrap-buttons";
export default {
  data() {
    return {
      loadedBooking: {
        id: null,
        formattedTime: null,
        testCenter: {
          name: null,
          address: null,
        },
      },
      bookingApiService: null,
    };
  },
  created() {
    this.bookingApiService = createBookingApiService();
    this.bookingApiService
      .loadBookingById(this.$route.params.bookingId)
      .then((response) => {
        this.loadedBooking = response.loadedBooking;
      })
      .catch(() => {
        this.$router.push({ name: "index" });
      });
  },
  methods: {
    async bookingCancel() {
      await SwalWithBootstrapButtons.fire({
        title: "Sind Sie Sicher!",
        text: "Das Sie die Buchung stornieren möchten?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ja, bitte stornieren",
        cancelButtonText: "Abbrechen",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.bookingApiService
            .bookingCancel(this.$route.params.bookingId)
            .then(async () => {
              await SwalWithBootstrapButtons.fire({
                title: "Erfolg!",
                text: "Die Stornierung war erfolgreich",
                icon: "success",
                timer: 5000,
              });

              await this.$router.push({ name: "index" });
            })
            .catch(() => {
              SwalWithBootstrapButtons.fire({
                title: "Fehler!",
                text: "Stornierung nicht möglich bitte versuchen Sie es später nochmal",
                icon: "error",
                confirmButtonText: "Verstanden",
              });
            });
        }
      });
    },
  },
};
</script>
