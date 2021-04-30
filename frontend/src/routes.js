import React from "react";
import { Switch, Route, Redirect } from "react-router";
import chat from "./pages/chat";

export default (props) => (
  <Switch>
    <Route exact path="/chat" component={chat} />
    <Route path="*">
      <Redirect to="/chat" />
    </Route>
  </Switch>
);