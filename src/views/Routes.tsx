import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { HomePage } from "./home-page";

interface Props {}

export function Routes(props: Props) {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}
