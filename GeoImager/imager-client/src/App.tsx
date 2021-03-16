import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import EditProfile from "./components/Profile/EditProfile";
import MainProfile from "./components/Profile/MainProfile";
import PayloadHelper from "./helpers/PayloadHelper";
import ProtectedRoute, { ProtectedRouteProps } from "./helpers/ProtectedRoute";

function AppRouter() {
  let payloadHelper = new PayloadHelper();
  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: payloadHelper.PayloadCookieExists(),
    authenticationPath: "/",
    restrictedPath: "/settings/edit",
    isAllowed: true,
  };

  return (
    <Router>
      <div className="bg-light">
        <Route path="/" exact component={Home} />
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          exact={true}
          path="/settings/edit"
          component={EditProfile}
        />

        <Route path="/profile/:username" component={MainProfile} />
      </div>
    </Router>
  );
}

export default AppRouter;
