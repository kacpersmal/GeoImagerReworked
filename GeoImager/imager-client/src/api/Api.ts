import axios, { AxiosInstance } from "axios";
import TokenHelper from "../helpers/TokenHelper";

export default class Api {
  api_token: string;
  client: AxiosInstance | null;
  api_url: string;

  constructor() {
    this.api_token = "";
    this.client = null;
    this.api_url = "/api/";
  }

  init = () => {
    this.api_token = new TokenHelper().GetTokenCookie();
    let headers = {
      Accept: "application/json",
      Authorization: "",
    };

    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };
}
