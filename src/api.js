import axios from "axios";
import { API_KEY } from "./hidden";

const BASE_URL = "https://weatherapi-com.p.rapidapi.com";
// const API_KEY = process.env.API_KEY;

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class WeatherApi {

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async getCurrentWeather(q) {
    let res = await this.request("current.json", {q});
    return res;
  }

  static async search(q){
    let res = await this.request("search.json", {q});
    return res;
  }

  static async getForecast(q){
    let res = await this.request("forecast.json", {q, days: 3});
    return res;
  }

  /** Gets public IP address for auto generated location */
  static async getIP(){
    let res = await axios("https://api.ipify.org?format=json");
    return res.data.ip;
  }
  
}

export default WeatherApi;
