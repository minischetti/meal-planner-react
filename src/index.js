import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';

// Containers
import { ProfilePage } from "./containers/ProfilePage";
import { RecipesPage } from "./containers/RecipesPage";
import { RecipePage } from "./containers/RecipePage";
import { EditRecipePage } from "./containers/EditRecipePage";
import { HomePage } from "./containers/HomePage";

// Selectors
import { getAuthenticationStatusFrom } from "./redux/selectors";
import { LoginPage } from "./containers/LoginPage";
import { NewRecipePage } from "./containers/NewRecipePage";

const AuthenticatedRoute = ({ children }) => {
    const isAuthenticated = useSelector(state => getAuthenticationStatusFrom(state));

        return(
            <React.Fragment>
                {isAuthenticated ? children : <Redirect to="/login" />}
            </React.Fragment>
        )
}

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <AuthenticatedRoute>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/profile" component={ProfilePage} />
                    <Route exact path="/recipe/new" component={NewRecipePage} />
                    <Route exact path="/recipes/:recipeId/edit" component={EditRecipePage} />
                    <Route exact path="/recipes/:recipeId" component={RecipePage} />
                    <Route exact path="/recipes" component={RecipesPage} />
                </AuthenticatedRoute>
            </Switch>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));