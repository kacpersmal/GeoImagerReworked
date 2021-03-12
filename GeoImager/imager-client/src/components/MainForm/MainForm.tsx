import React from "react";
import { Card, Tab, Tabs } from "react-bootstrap";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
const MainForm = () => {
  return (
    <div>
      <Card className="login-card" style={{ width: "18rem" }}>
        <Card.Header as="h5">
          <Tabs defaultActiveKey="login">
            <Tab eventKey="login" title="login">
              <LoginForm />
            </Tab>
            <Tab eventKey="register" title="register">
              <RegisterForm />
            </Tab>
          </Tabs>
        </Card.Header>
      </Card>
    </div>
  );
};

export default MainForm;
