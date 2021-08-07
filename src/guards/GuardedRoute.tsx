import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

type IPros = {
  component: any;
  condition: boolean;
} & RouteProps;
export default function GuardedRoute({
  component: Component,
  condition,
  ...rest
}: IPros) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return condition ? <Component {...props} /> : <Redirect to="/signin" />;
      }}
    ></Route>
  );
}
