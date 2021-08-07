import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Signin from "./pages/login/Signin";
import Home from "./pages/home/Home";
import GuardedRoute from "./guards/GuardedRoute";
import { getToken } from "./storage";
import { userAuthSubject } from "./api/UserAPI";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  useEffect(() => {
    userAuthSubject.subscribe(() => {
      setIsAuthenticated(!!getToken());
    });
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <Signin></Signin>
        </Route>
        <GuardedRoute
          path="/home"
          component={Home}
          condition={isAuthenticated}
        />

        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
