<template>
  <div id="app">
    <b-container fluid>
      <Navbar />
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>
