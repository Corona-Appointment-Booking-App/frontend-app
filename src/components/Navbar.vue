<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <router-link :to="{ name: 'index' }"
        ><b-navbar-brand>Startseite</b-navbar-brand></router-link
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link :to="{ name: 'index' }"
            ><b-nav-item>FAQ</b-nav-item></router-link
          >
          <router-link :to="{ name: 'index' }"
            ><b-nav-item>Impressum</b-nav-item></router-link
          >
          <router-link :to="{ name: 'index' }"
            ><b-nav-item>Datenschutz</b-nav-item></router-link
          >
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <router-link
            :to="{ name: 'city', params: { seoSlug: 'duesseldorf' } }"
          >
            <b-button variant="success">Jetzt Termin buchen</b-button>
          </router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
