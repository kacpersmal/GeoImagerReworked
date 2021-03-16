import axios, { AxiosInstance } from "axios";
import PayloadHelper from "../helpers/PayloadHelper";
import IGetProfileRequest from "./interfaces/request/IGetProfileRequest";
import ILogin from "./interfaces/request/ILogin";
import IRegister from "./interfaces/request/IRegister";

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
    let payloadHelper = new PayloadHelper();
    if (payloadHelper.PayloadCookieExists()) {
      this.api_token = payloadHelper.GetPayloadCookie().token;
    }
    let headers = {
      Accept: "application/json",
      Authorization: "",
    };
    if (this.api_token.length > 0 && this.api_token) {
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

  authUser = (data: ILogin) => {
    return this.init().post("/auth/authenticate", data);
  };

  getUserProfile = (data: IGetProfileRequest) => {
    return this.init().get("/profile/" + data.Username);
  };
}
