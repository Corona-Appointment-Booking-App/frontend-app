<template>
  <div>
    <b-jumbotron>
      <template #header>Schnelltest-Termin vereinbaren</template>

      <template #lead>
        Kostenlose Corona-Schnelltests in allen Stadtbezirken
      </template>

      <hr class="my-4" />

      <router-link :to="{ name: 'city', params: { seoSlug: 'duesseldorf' } }"
        ><b-button variant="primary">Jetzt Termin buchen</b-button></router-link
      >
    </b-jumbotron>
  </div>
</template>
