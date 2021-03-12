import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import PayloadHelper from "./helpers/PayloadHelper";
import ProtectedRoute, { ProtectedRouteProps } from "./helpers/ProtectedRoute";

function testAuth() {
  return (
    <div>
      <p>Test</p>
    </div>
  );
}

function AppRouter() {
  let payloadHelper = new PayloadHelper();
  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: payloadHelper.PayloadCookieExists(),
    authenticationPath: "/",
    restrictedPath: "/test",
    isAllowed: true,
  };

  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          exact={true}
          path="/test"
          component={testAuth}
        />
      </div>
    </Router>
  );
}

export default AppRouter;
