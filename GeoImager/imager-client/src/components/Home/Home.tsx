import React, { Component } from "react"; // let's also import Component
import Api from "../../api/Api";

type MyProps = {};
type MyState = {};
export default class Home extends Component<MyProps, MyState> {
  componentDidMount() {}

  state: MyState = {
    forecast: null,
  };
  render() {
    return <div></div>;
  }
}
