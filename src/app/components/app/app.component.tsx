import * as React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Todos from "../todo/todos.component";
import { DIContext, getDependencies } from "@helpers";

import "./app.styles.css";

const App = (): JSX.Element => {
  const dependencies = React.useContext(DIContext);
  const { translation } = dependencies;
  return (
    <DIContext.Provider value={getDependencies()}>
      <div className="center-wrap">
        <Router>
          <div>
            <nav>
              <img
                className="logo"
                src={require("@assets/images/logo.png")}
                alt=""
              />
              <ul id="menu">
                <li>
                  <Link to="/todo">{translation.t("TODO")}</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route exact path="/todo" component={Todos} />
            </Switch>
          </div>
        </Router>
      </div>
    </DIContext.Provider>
  );
};

export default App;
