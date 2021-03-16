import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { Redirect } from "react-router";
import PayloadHelper from "../../helpers/PayloadHelper";

const Navigation = () => {
  const [username, setUsername] = useState("");
  const [loggedOff, setLoggedOff] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    let helper = new PayloadHelper();
    if (helper.PayloadCookieExists()) {
      setSignedIn(true);
      setUsername(helper.GetPayloadCookie().username);
    }
  }, []);

  const signOut = () => {
    let helper = new PayloadHelper();
    helper.DeletePayloadCookie();

    setLoggedOff(true);
  };

  if (loggedOff) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }

  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" bg="dark" variant="dark">
      <Navbar.Brand href="/">GeoImager</Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {signedIn && <Nav.Link href="">My Feed</Nav.Link>}
          <Nav.Link href="">Search on map</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
          {signedIn && (
            <NavDropdown title={username} id="collasible-nav-dropdown">
              <NavDropdown.Item href="">My Profile</NavDropdown.Item>
              <NavDropdown.Item href="">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="">
                <Button onClick={signOut} variant="outline-danger">
                  Logout
                </Button>
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
