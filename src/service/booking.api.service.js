import apiClient from "./api.client.service";
import {
  API_ENDPOINT_BOOKING_CHECKOUT,
  API_ENDPOINT_BOOKING_CHECKOUT_FETCH_TOKEN,
  API_ENDPOINT_BOOKING_CHECKOUT_FINALIZE,
  API_ENDPOINT_LOAD_BOOKING_BY_ID,
  API_ENDPOINT_BOOKING_CANCEL,
} from "../api.const";

export class BookingApiService {
  loadBookingCheckout(testCenterId, selectedOpeningDayDate) {
    return apiClient
      .post(`${API_ENDPOINT_BOOKING_CHECKOUT}`, {
        testCenterId,
        selectedOpeningDayDate,
      })
      .then((response) => {
        let loadedBookingIndex = response.data.data;

        return {
          loadedBookingIndex,
        };
      });
  }

  loadBookingById(bookingId) {
    return apiClient
      .get(`${API_ENDPOINT_LOAD_BOOKING_BY_ID}/${bookingId}`)
      .then((response) => {
        let loadedBooking = response.data.data;

        return {
          loadedBooking,
        };
      });
  }

  bookingCancel(bookingId) {
    return apiClient
      .post(`${API_ENDPOINT_BOOKING_CANCEL}`, {
        bookingId,
      })
      .then((response) => {
        return response.data.token;
      });
  }

  bookingFetchToken(
    participants,
    selectedTestCenterId,
    selectedOpeningDayDate,
    selectedOpeningTime
  ) {
    return apiClient
      .post(`${API_ENDPOINT_BOOKING_CHECKOUT_FETCH_TOKEN}`, {
        participants,
        selectedTestCenterId,
        selectedOpeningDayDate,
        selectedOpeningTime,
      })
      .then((response) => {
        return response.data.token;
      });
  }

  bookingFinalize(
    participants,
    token,
    selectedTestCenterId,
    selectedOpeningDayDate,
    selectedOpeningTime
  ) {
    return apiClient.post(`${API_ENDPOINT_BOOKING_CHECKOUT_FINALIZE}`, {
      participants,
      token,
      selectedTestCenterId,
      selectedOpeningDayDate,
      selectedOpeningTime,
    });
  }
}
