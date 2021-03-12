import Cookies from "js-cookie";
import IUserPayload from "./IUserPayload";

export default class PayloadHelper {
  CreatePayloadCookie(payload: IUserPayload) {
    Cookies.set("UserPayload", payload, { expires: 7 });
  }

  PayloadCookieExists(): boolean {
    if (Cookies.get("UserPayload")) return true;
    return false;
  }

  GetPayloadCookie(): IUserPayload {
    let cookie = Cookies.get("UserPayload");
    if (cookie === undefined) cookie = "";
    let payload: IUserPayload = JSON.parse(cookie);
    return payload;
  }

  DeletePayloadCookie() {
    Cookies.remove("UserPayload");
  }
}
