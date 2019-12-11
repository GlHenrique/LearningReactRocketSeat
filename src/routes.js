import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from "./pages/Main";
import Repository from "./pages/Repository";
import React from "react";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/repository" component={Repository}/>
                <Route path="/" exact component={Main}/>
            </Switch>
        </BrowserRouter>
    )
}

