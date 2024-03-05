import axios from "axios";
import { CURRENT_DAY_WEARTHER_API, GEOCODING_API, NEXT_SEVEN_DAY_FORECAST_API } from "../constants/api";

export class ApiMethod {
  static async getGeoCodingOfCityByName(place: string, appid: string) {
    try {
      const response = await axios.get(GEOCODING_API, {
        params: {
          q: place,
          appid
        }
      })
      return response?.data?.[0]
    } catch (error) {
      return error;
    }
  }

  static async getCurrentDayWearther(lat: string, lon: string, appid: string) {
    try {
      const response = await axios.get(CURRENT_DAY_WEARTHER_API, {
        params: {
          lat,
          lon,
          appid
        }
      })
      return response.data
    } catch(error) {
      return error
    }
  }

  static async getNextSevenDayForecast(lat: string, lon: string, appid: string) {
    try {
      const response = await axios.get(NEXT_SEVEN_DAY_FORECAST_API, {
        params: {
          lat,
          lon, 
          appid
        }
      })
      return response?.data?.daily
    } catch(error) {
      return error;
    }
  }
}