import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home";
import City from "@/pages/City";
import TestCenter from "@/pages/TestCenter";
import BookingCheckout from "@/pages/BookingCheckout";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "index",
      component: Home,
    },
    {
      path: "/city/:seoSlug",
      name: "city",
      component: City,
    },
    {
      path: "/testCenter/:testCenterId",
      name: "testCenter",
      component: TestCenter,
    },
    {
      path: "/booking/checkout",
      name: "bookingCheckout",
      component: BookingCheckout,
    },
  ],
});
