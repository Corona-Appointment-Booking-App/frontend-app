import apiClient from "./api.client.service";
import { API_ENDPOINT_LOAD_TEST_CENTER_BY_ID } from "../api.const";

export class TestCenterApiService {
  loadTestCenter(testCenterId) {
    return apiClient
      .get(`${API_ENDPOINT_LOAD_TEST_CENTER_BY_ID}/${testCenterId}`)
      .then((response) => {
        let loadedTestCenter = response.data.data;

        return {
          loadedTestCenter,
        };
      });
  }
}
