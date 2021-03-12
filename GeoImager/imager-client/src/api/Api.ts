import axios, { AxiosInstance } from "axios";
import TokenHelper from "../helpers/TokenHelper";
import IRegister from "./interfaces/IRegister";

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

    if (this.api_token.length > 0) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  registerUser = (data: IRegister) => {
    return this.init().post("/auth/register", data);
  };
}
