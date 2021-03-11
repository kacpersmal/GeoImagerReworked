import Cookies from "js-cookie";

export default class TokenHelper {
  CreateTokenCookie(token: string) {
    Cookies.set("JwtToken", token, { expires: 7 });
  }

  TokenCookieExists(): boolean {
    if (Cookies.get("JwtToken")) return true;
    return false;
  }

  GetTokenCookie(): string {
    let cookie = Cookies.get("JwtToken");
    if (cookie) return cookie;
    return "";
  }

  DeleteTokenCookie() {
    Cookies.remove("JwtToken");
  }
}
