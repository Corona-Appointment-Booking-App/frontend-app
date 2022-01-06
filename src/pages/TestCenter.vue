<template>
  <b-container class="py-5">
    <b-row class="justify-content-center no-scrollbar">
      <h2>Bitte wählen Sie Ihren gewünschten Zeitraum</h2>
      <b-col md="10">
        <h5>{{ loadedTestCenter.name }}</h5>
        <h5>{{ loadedTestCenter.address }}</h5>
      </b-col>

      <b-col
        v-for="availableOpeningDay in loadedTestCenter.availableNextOpeningDays"
        :key="`${availableOpeningDay.id}-${availableOpeningDay.date}`"
        md="10"
      >
        <b-row class="justify-content-center mt-3">
          <h4 class="col-12 text-center mt-3">
            {{ availableOpeningDay.day }}, {{ availableOpeningDay.date }}
          </h4>
          <b-button
            variant="primary"
            @click="onClickAvailableOpeningDay(availableOpeningDay)"
            class="col-4 d-flex justify-content-center align-items-center p-4 text-center"
          >
            {{ availableOpeningDay.date }}
            <br />
            ab
            {{ availableOpeningDay.openingTimeFrom }}
          </b-button>
        </b-row>
      </b-col>
    </b-row>

    <b-row class="justify-content-center no-scrollbar mt-5">
      <b-col md="10">
        <router-link
          class="text-decoration-none"
          :to="{ name: 'city', params: { seoSlug: 'duesseldorf' } }"
          ><b-button class="btn-block" variant="outline-primary"
            >Zurück zur Übersicht</b-button
          ></router-link
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { createTestCenterApiService } from "@/service/test-center.api.service.factory";

export default {
  data() {
    return {
      loadedTestCenter: {},
      testCenterApiService: null,
    };
  },
  created() {
    this.testCenterApiService = createTestCenterApiService();
    this.testCenterApiService
      .loadTestCenter(this.$route.params.testCenterId)
      .then((response) => {
        this.loadedTestCenter = response.loadedTestCenter;
      })
      .catch(() => {
        this.$router.push({ name: "index" });
      });
  },
  methods: {
    onClickAvailableOpeningDay(availableOpeningDay) {
      localStorage.setItem(
        "selectedTestCenterId",
        this.$route.params.testCenterId
      );
      localStorage.setItem("selectedOpeningDayDate", availableOpeningDay.date);

      this.$router.push({ name: "bookingCheckout" });
    },
  },
};
</script>
