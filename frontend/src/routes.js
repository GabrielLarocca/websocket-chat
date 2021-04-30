import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Chat from "./pages/Chat";

export default (props) => (
  <Switch>
    <Route exact path="/chat" component={Chat} />
    <Route path="*">
      <Redirect to="/chat" />
    </Route>
  </Switch>
);