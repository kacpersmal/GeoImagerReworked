import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import validator from "validator";
import Api from "../../api/Api";
import IRegister from "../../api/interfaces/request/IRegister";
import "./MainForm.css";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [createSucces, setCreateSucces] = useState(false);
  const [createFailMessage, setcreateFailMessage] = useState("");

  const submit = () => {
    const api = new Api();

    let validated = true;
    const data: IRegister = {
      Password: password,
      Email: email,
      PasswordConfirm: passwordConfirm,
      Username: username,
    };

    if (!validator.isLength(password, { min: 7, max: 50 })) {
      validated = false;
      setPasswordError("Password must have atleast 8 characters");
    }
    if (!validator.isEmail(email)) {
      validated = false;
      setEmailError("This is not valid email!");
    }
    if (
      validator.isEmpty(username) ||
      !validator.isLength(username, { min: 7, max: 50 })
    ) {
      validated = false;
      setUsernameError("This is invalid username");
    }
    if (!validator.matches(password, passwordConfirm)) {
      validated = false;
      setPasswordConfirmError("Passwords don't match");
    }
    if (validated) {
      api.registerUser(data).then((res) => {
        setCreateSucces(res.data.succes);
        if (!res.data.succes) {
          setcreateFailMessage("Account with such email or username exists!");
        }
      });
    }
  };

  return (
    <div>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Control
              onChange={(e) => {
                setUsername(e.target.value.replace(/\s/g, ""));
              }}
              type="text"
              placeholder="Username"
            />
            <Form.Text className="text-muted ">
              <p className="text-danger">{usernameError}</p>
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={(e) => {
                setEmail(e.target.value.replace(/\s/g, ""));
              }}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted ">
              <p className="text-danger">{emailError}</p>
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={(e) => {
                setPassword(e.target.value.replace(/\s/g, ""));
              }}
              type="password"
              placeholder="Password"
            />
            <Form.Text className="text-muted ">
              <p className="text-danger">{passwordError}</p>
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={(e) => {
                setPasswordConfirm(e.target.value.replace(/\s/g, ""));
              }}
              type="password"
              placeholder="Confirm password"
            />
            <Form.Text className="text-muted ">
              <p className="text-danger">{passwordConfirmError}</p>
            </Form.Text>
          </Form.Group>
          {createSucces && (
            <Form.Text className="text-muted ">
              <p className="text-success">Account created succesfully!</p>
            </Form.Text>
          )}
          {!createSucces && (
            <Form.Text className="text-muted ">
              <p className="text-danger">{createFailMessage}</p>
            </Form.Text>
          )}

          <Button variant="primary" onClick={submit}>
            Register
          </Button>
        </Form>
      </Card.Body>
    </div>
  );
};

export default RegisterForm;
