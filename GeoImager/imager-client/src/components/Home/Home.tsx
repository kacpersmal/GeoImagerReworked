import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import MainForm from "../MainForm/MainForm";
import "./Home.css";

type MyProps = {};
type MyState = {
  backgroundUrl: string;
};
export default class Home extends Component<MyProps, MyState> {
  componentDidMount() {}

  state: MyState = {
    backgroundUrl: process.env.PUBLIC_URL + "/images/mountains.jpg",
  };
  render() {
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
