import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Todo from "../routes/Todo";

const AppRouter = ({urlObj}) => {
    return(
        <Router>
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