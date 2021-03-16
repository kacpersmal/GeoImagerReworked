import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import MainProfile from "./components/Profile/MainProfile";
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
      <div className="bg-light">
        <Route path="/" exact component={Home} />
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          exact={true}
          path="/test"
          component={testAuth}
        />
        <Route path="/profile/:username" component={MainProfile} />
      </div>
    </Router>
  );
}

export default AppRouter;
