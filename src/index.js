import React, { useContext } from "react";
import { render } from "react-dom";

import { Provider as StoreProvider } from "react-redux";
import { authContext } from "./context";
import store from "./redux/store";
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

// Containers
import { ProfilePage } from "./containers/ProfilePage";
import { RecipesPage } from "./containers/RecipesPage";
import { RecipePage } from "./containers/RecipePage";
import { EditRecipePage } from "./containers/EditRecipePage";
import { HomePage } from "./containers/HomePage";

// Selectors
import { SignInPage } from "./containers/SignInPage";
import { NewRecipePage } from "./containers/NewRecipePage";

// Authentication
import { useAuth } from "./hooks/useAuth";

const AuthenticatedRoute = ({ children }) => {
    const { user } = useContext(authContext);
    const isAuthenticated = !!user;

    return (
        <React.Fragment>
            {isAuthenticated ? children : <Redirect to="/sign-in" />}
        </React.Fragment>
    );
};

function App() {
    const {authState, signIn, signOut} = useAuth();
    const { user, authInProgress, authError } = authState;

    return (
        <authContext.Provider value={{ user, authInProgress, authError, signIn, signOut }}>
            <StoreProvider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/sign-in" component={SignInPage} />
                        <Route
                            exact
                            path="/profile/:profileId"
                            component={ProfilePage}
                        />
                        <Route
                            exact
                            path="/profile/:profileId/recipes"
                            component={RecipesPage}
                        />
                        <Route
                            exact
                            path="/recipes/:recipeId"
                            component={RecipePage}
                        />
                        <AuthenticatedRoute>
                            <Route exact path="/" component={HomePage} />
                            <Route
                                exact
                                path="/recipe/new"
                                component={NewRecipePage}
                            />
                            <Route
                                exact
                                path="/recipes/:recipeId/edit"
                                component={EditRecipePage}
                            />
                        </AuthenticatedRoute>
                    </Switch>
                </BrowserRouter>
            </StoreProvider>
        </authContext.Provider>
    );
}

render(<App />, document.getElementById("app"));
