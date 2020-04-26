import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import IndexPage from "./pages";
import LoginPage from "./pages/login";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/index">
          <IndexPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
