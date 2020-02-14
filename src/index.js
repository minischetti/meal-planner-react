import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import { Home } from "./containers/Home";

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Recipes } from "./components/Recipes";
import { Profile } from "./components/Profile";

const app = (
    <Provider store={store}>
        <Router>
            <Route path="/" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/recipes" component={Recipes} />
        </Router>
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));