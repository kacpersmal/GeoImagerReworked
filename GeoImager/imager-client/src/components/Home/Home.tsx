import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Redirect } from "react-router";
import PayloadHelper from "../../helpers/PayloadHelper";
import MainForm from "../MainForm/MainForm";
import "./Home.css";

type MyProps = {};
type MyState = {
  backgroundUrl: string;
  loggedIn: boolean;
  username: string;
};
export default class Home extends Component<MyProps, MyState> {
  componentDidMount() {
    let helper = new PayloadHelper();
    if (helper.PayloadCookieExists()) {
      this.setState({
        loggedIn: true,
        username: helper.GetPayloadCookie().username,
      });
    }
  }

  state: MyState = {
    backgroundUrl: process.env.PUBLIC_URL + "/images/mountains.jpg",
    loggedIn: false,
    username: "",
  };
  render() {
    if (this.state.loggedIn) {
      return (
        <div>
          <Redirect to={"/profile/" + this.state.username} />
        </div>
      );
    }
    return (
      <div
        className="Home"
        style={{ backgroundImage: `url(${this.state.backgroundUrl})` }}
      >
        <Container>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col>
              <MainForm />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
