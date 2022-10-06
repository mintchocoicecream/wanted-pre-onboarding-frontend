import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Todo from "../routes/Todo";

const AppRouter = () => {
    return(
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/todos">
                    <Todo />
                </Route>
            </Switch>
        </Router>
    )
}

export default AppRouter;