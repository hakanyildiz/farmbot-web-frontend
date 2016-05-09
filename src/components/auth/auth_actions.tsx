import { fetchDevice } from "../../components/devices/bot_actions";
import { push } from "../../history";
import { fetchSequences } from "../sequences/sequence_actions";
import { post } from "axios";
import { error } from "../../logger";

export interface AuthResponseToken {
    unencoded: AuthToken;
    encoded: string;
};

export interface AuthResponse {
  token: AuthResponseToken;
};

// We need to handle OK logins for numerous use cases (Ex: login AND registration)
let onLogin = (dispatch: Function) => (response: AuthResponse) => {
  dispatch(loginOk(response.token));
  //
  let soSorry = _.cloneDeep<AuthResponseToken>(response.token);
  soSorry.unencoded.token = soSorry.encoded;

  dispatch(fetchDevice(soSorry.encoded));
  dispatch(fetchSequences(soSorry));
  // Why doesn't push() from react-router-redux work? :(
  push("/app/dashboard/controls");
};

export function login(username, password, url) {
  return dispatch => {
    return requestToken(username, password, url).then(
      onLogin(dispatch),
      (err) => dispatch(loginErr(err))
    );
  };
}

function loginErr(err) {
  return {
    type: "LOGIN_ERR",
    payload: err
  };
}

export interface AuthToken {
  sub: string;
  iat: number;
  jti: string;
  iss: string;
  exp: number;
  mqtt: string;
  bot: string;
  // This value is only available after LOGIN_OK is dispatched.
  // FIXME
  token?:  string;
  authenticated: boolean;
}

export interface LoginOk {
  type: "LOGIN_OK";
  payload: AuthResponseToken;
};

export function loginOk(token: AuthResponseToken) {
  return {
    type: "LOGIN_OK",
    payload: token
  };
}

export function register(name, email, password, confirmation, url) {
  return dispatch => {
    let p = requestRegistration(name,
                                email,
                                password,
                                confirmation,
                                url);
    return p.then((r) => onLogin(dispatch)(r.data),
                  onRegistrationErr(dispatch));
  };
}

export function onRegistrationErr(dispatch) {
  return (err) => {
    let msg = _.values(err.data)
               .join(". ")
               .replace(/nil/g, "empty") || "Unknown server error.";
    error(msg);
    dispatch({
      type: "REGISTRATION_ERROR",
      payload: err
    });
  };
}

function requestRegistration(name, email, password, confirmation, url) {
  let form = {
    user: {
      email: email,
      password: password,
      password_confirmation: confirmation,
      name: name
    }
  };
  return post<AuthResponse>(url + "/api/users", form);
}


function requestToken(email, password, url) {
  return $.ajax({
    url: url + "/api/tokens",
    type: "POST",
    data: JSON.stringify({ user: { email: email, password: password } }),
    contentType: "application/json"
  });
}