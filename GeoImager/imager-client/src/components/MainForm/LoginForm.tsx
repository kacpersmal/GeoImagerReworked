import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Redirect } from "react-router";
import Api from "../../api/Api";
import ILogin from "../../api/interfaces/request/ILogin";
import ILoginResponse from "../../api/interfaces/response/ILoginResponse";
import PayloadHelper from "../../helpers/PayloadHelper";
import "./MainForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSucces, setLoginSucces] = useState(false);
  const [username, setUsername] = useState("");

  const submit = () => {
    const api = new Api();
    const payloadHelper = new PayloadHelper();
    const data: ILogin = {
      Password: password,
      Email: email,
    };

    api.authUser(data).then((res) => {
      let dt = res.data as ILoginResponse;
      console.log(dt);

      if (dt.authenticated && dt.payload !== undefined) {
        payloadHelper.CreatePayloadCookie(dt.payload);
        setUsername(dt.payload.username);
        setLoginSucces(true);
      } else {
        setLoginError("Invalid email or password");
      }
    });
  };

  return (
    <div>
      {loginSucces && <Redirect to={"/profile/" + username} />}
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Control
              onChange={(e) => {
                setEmail(e.target.value.replace(/\s/g, ""));
              }}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={(e) => {
                setPassword(e.target.value.replace(/\s/g, ""));
              }}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Text className="text-muted ">
            <p className="text-danger">{loginError}</p>
          </Form.Text>
          <Button variant="primary" onClick={submit}>
            Sign in
          </Button>
        </Form>
      </Card.Body>
    </div>
  );
};

export default LoginForm;
