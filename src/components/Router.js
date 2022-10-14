import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Todo from "../routes/Todo";

const AppRouter = ({urlObj}) => {
    return(
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                    <Route exact path="/">
                        <Home url={urlObj}/>
                    </Route>
                    <Route exact path="/todos">
                        <Todo url={urlObj}/>
                    </Route>
            </Switch>
        </Router>
    )
}

export default AppRouter;