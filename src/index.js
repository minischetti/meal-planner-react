import React, { useContext } from "react";
import { render } from "react-dom";

import { Provider as StoreProvider } from "react-redux";
import { authContext } from "./context";
import store from "./redux/store";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Containers
import {
    HomePage,
    ProfilePage,
    RecipeListPage,
    RecipePage,
    NewRecipePage,
    EditRecipePage,
    GroupListPage,
    GroupPage,
    SignInPage
} from "./containers";

// Authentication
import { useAuth } from "./hooks/useAuth";
import { GroupRecipeListPage } from "./containers/GroupRecipeListPage";
import { GroupMemberListPage } from "./containers/GroupMemberListPage";

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
    const { authState, signIn, signOut } = useAuth();
    const { user, authInProgress, authError } = authState;

    return (
        <authContext.Provider
            value={{ user, authInProgress, authError, signIn, signOut }}
        >
            <StoreProvider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/sign-in" component={SignInPage} />
                        <Route
                            exact
                            path="/profiles/:profileId"
                            component={ProfilePage}
                        />
                        <Route
                            exact
                            path="/profiles/:profileId/recipes"
                            component={RecipeListPage}
                        />
                        <Route
                            exact
                            path="/recipes/:recipeId"
                            component={RecipePage}
                        />
                        <Route
                            exact
                            path="/profiles/:profileId/groups"
                            component={GroupListPage}
                        />
                        <Route
                            exact
                            path="/groups/:groupId"
                            component={GroupPage}
                        />
                        <Route
                            exact
                            path="/groups/:groupId/recipes"
                            component={GroupRecipeListPage}
                        />
                        <Route
                            exact
                            path="/groups/:groupId/members"
                            component={GroupMemberListPage}
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
