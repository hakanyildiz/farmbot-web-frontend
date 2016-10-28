import * as React from "react";
import { Navbar } from "./nav/navbar";
import { login, register, logout } from "./auth/actions";
import { connect } from "react-redux";
import { changeApiHost, changeApiPort } from "./config/actions";
import { Everything } from "./interfaces";
import * as i18next from "i18next";

let setHost = (dispatch: Function) => (e: React.FormEvent) => dispatch(
  changeApiHost((e.target as HTMLInputElement).value));

let setPort = (dispatch: Function) => (e: React.FormEvent) => dispatch(
  changeApiPort((e.target as HTMLInputElement).value));


class LoginPage extends React.Component<Everything, any> {

  componentDidMount() {
    this.props.dispatch(logout());
  }

  get url(): string {
    return `//${this.props.config.host}:${this.props.config.port}`;
  }

  set(name: string) {
    return function (event: React.FormEvent) {
      let state: { [name: string]: string } = {};
      state[name] = (event.target as HTMLInputElement).value;
      this.setState(state);
    };
  }

  submitLogin(e: React.FormEvent) {
    e.preventDefault();
    let password = (this.state || {}).loginPassword;
    let email = (this.state || {}).loginEmail;
    return this.props.dispatch(login(email, password, this.url));
  }

  submitRegistration(e: React.FormEvent) {
    e.preventDefault();
    let state = this.state || {};

    let name = state.regName;
    let email = state.regEmail;
    let password = state.regPass;
    let confirmation = state.regConfirmation;
    let action = register(name, email, password, confirmation, this.url);

    return this.props.dispatch(action);
  }

  render() {
    return (
      <div>
        <Navbar { ...this.props } />
        <div className="all-content-wrapper">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
              <div className="widget-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="widget-header">
                      <h5> {i18next.t("Login")} </h5>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <form onSubmit={this.submitLogin.bind(this)} >
                    <div className="col-sm-12">
                      <div className="widget-content">
                        <div className="input-group">
                          <label> {i18next.t("Email")} </label>
                          <input type="email"
                            onChange={this.set("loginEmail").bind(this)}>
                          </input>
                          <label>{i18next.t("Password")}</label>
                          <input type="password"
                            onChange={this.set("loginPassword").bind(this)}>
                          </input>
                        </div>
                        <div className="row">
                          <div className="col-xs-6">
                            <p className="auth-link">
                              <a href={
                                this.url + "/users/password/new"
                              }>
                                {i18next.t("Reset password")}
                              </a>
                            </p>
                          </div>
                          <div className="col-xs-6">
                            <button className="button-like button green login">
                              {i18next.t("Login")}
                            </button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xs-12">
                            <label> {i18next.t("Server URL")} </label>
                            <input type="text"
                              value={this.props.config.host}
                              onChange={setHost(this.props.dispatch)} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xs-12">
                            <label> {i18next.t("Server Port")} </label>
                            <input type="number"
                              value={this.props.config.port}
                              onChange={setPort(this.props.dispatch)} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
              <div className="widget-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="widget-header">
                      <h5> {i18next.t("Register")} </h5>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <form onSubmit={this.submitRegistration.bind(this)} >
                      <div className="widget-content">
                        <div className="input-group">
                          <label>{i18next.t("Email")} </label>
                          <input type="email" onChange={this.set("regEmail").bind(this)} ></input>
                          <label>Name</label>
                          <input type="text" onChange={this.set("regName").bind(this)}></input>
                          <label>Password</label>
                          <input type="password"
                            onChange={this.set("regPass").bind(this)}>
                          </input>
                          <label>{i18next.t("Verfy Password")}</label>
                          <input type="password"
                            onChange={
                              this.set("regConfirmation").bind(this)}>
                          </input>
                        </div>
                        <div className="row">
                          <div className="col-xs-6">
                          </div>
                          <div className="col-xs-6">
                            <div className="auth-button">
                              <button className="button-like button green create-account">
                                {i18next.t("Create Account")}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export let Login = connect(state => state)(LoginPage);
