import apiClient from "./api.client.service";
import { API_ENDPOINT_LOAD_CITY_BY_SEO_SLUG } from "../api.const";

export class CityApiService {
  loadCityBySeoSlug(seoSlug) {
    return apiClient
      .get(`${API_ENDPOINT_LOAD_CITY_BY_SEO_SLUG}/${seoSlug}`)
      .then((response) => {
        let loadedCity = response.data.data;

        return {
          loadedCity,
        };
      });
  }
}
