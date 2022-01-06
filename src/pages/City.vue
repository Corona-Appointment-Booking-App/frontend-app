<template>
  <b-container class="py-5">
    <b-row class="justify-content-center">
      <div class="section-title">
        <h3>
          Bitte wählen Sie Ihren gewünschten Bezirk und den gewünschten
          Teststandort aus
        </h3>
      </div>
      <b-col md="10">
        <div class="accordion" role="tablist">
          <b-card
            no-body
            class="mb-1"
            v-for="location in loadedCity.locations"
            :key="location.id"
          >
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button
                block
                v-b-toggle="'accordion-city-location-' + location.id"
                variant="primary"
                >{{ location.name }}</b-button
              >
            </b-card-header>
            <b-collapse
              :id="`accordion-city-location-${location.id}`"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <div class="card-body">
                  <div
                    class="col-12 mt-3 p-2 border border-dark text-left"
                    v-for="testCenter in location.testCenters"
                    :key="testCenter.id"
                  >
                    <h4>{{ testCenter.name }}</h4>
                    <p>{{ testCenter.generatedOpeningDaysText }}</p>
                    <router-link
                      :to="{
                        name: 'testCenter',
                        params: { testCenterId: testCenter.id },
                      }"
                      class="text-decoration-none"
                    >
                      <b-button class="btn-block mb-2" variant="outline-success"
                        >Verfügbare Termine</b-button
                      >
                    </router-link>
                  </div>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { createCityApiService } from "@/service/city.api.service.factory";

export default {
  data() {
    return {
      loadedCity: {},
      cityApiService: null,
    };
  },
  created() {
    this.cityApiService = createCityApiService();
    this.cityApiService
      .loadCityBySeoSlug(this.$route.params.seoSlug)
      .then((response) => {
        this.loadedCity = response.loadedCity;
      })
      .catch(() => {
        this.$router.push({ name: "index" });
      });
  },
};
</script>
