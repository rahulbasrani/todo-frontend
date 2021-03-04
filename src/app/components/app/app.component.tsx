import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Switch,
} from "react-router-dom";

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
          <div className="nav_bg mb-0">
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/todo">
                {translation.t("TODO")}
              </NavLink>
            </div>
          </div>
          <div>
            <Link to="/todo">{translation.t("TODODOWN")}</Link>
          </div>
          <Switch>
            <Route exact path="/todo" component={Todos} />
          </Switch>
        </Router>
      </div>
    </DIContext.Provider>
  );
};

export default App;
