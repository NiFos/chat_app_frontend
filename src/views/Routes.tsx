import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AuthPage, authPagePath } from "./auth-page";
import { HomePage, homePagePath } from "./home-page";

interface Props {}

export function Routes(props: Props) {
  return (
    <Switch>
      <Route path={homePagePath} exact>
        <HomePage />
      </Route>
      <Route path={authPagePath} exact>
        <AuthPage />
      </Route>
      <Route path={"/chat"} exact>
        <div>Chat</div>
      </Route>
      <Redirect to={homePagePath} />
    </Switch>
  );
}
