import IUserPayload from "../../../helpers/IUserPayload";

export default interface ILoginResponse {
  authenticated: boolean;
  payload?: IUserPayload;
}
