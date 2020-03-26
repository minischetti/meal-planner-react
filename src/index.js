import React, { useContext } from "react";
import { render } from "react-dom";

import { Provider as StoreProvider } from "react-redux";
import { authContext } from "./context";
import store from "./redux/store";
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
    useHistory
} from "react-router-dom";

// Containers
import {
    // Common
    HomePage,
    SignInPage,
    ReadOnlyRecipePage,
    NewRecipePage,
    EditRecipePage,
    // Group
    GroupHomePage,
    GroupProfilePage,
    GroupMemberListPage,
    GroupRecipeListPage,
    // User
    UserHomePage,
    UserProfilePage,
    UserRecipeListPage,
    UserGroupListPage
} from "./containers";

// Authentication
import { useAuth } from "./hooks/useAuth";
import { NewGroupPage } from "./containers/NewGroupPage";
import { LoadingPage } from "./containers/LoadingPage";

const AuthenticatedRoute = ({ children }) => {
    const { user } = useContext(authContext);
    const history = useHistory();
    const isAuthenticated = !!user;

    return (
        <React.Fragment>
            {isAuthenticated ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: "/sign-in",
                        state: { referrer: history.location }
                    }}
                />
            )}
        </React.Fragment>
    );
};

function App() {
    const { authState, signIn, signOut } = useAuth();
    const { user, authInProgress, authError } = authState;

    if (authInProgress) {
        return <LoadingPage />
    }

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
                            component={UserHomePage}
                        />
                        <Route
                            exact
                            path="/profiles/:profileId/profile"
                            component={UserProfilePage}
                        />
                        <Route
                            exact
                            path="/profiles/:profileId/recipes"
                            component={UserRecipeListPage}
                        />
                        <Route
                            exact
                            path="/recipes/:recipeId"
                            component={ReadOnlyRecipePage}
                        />
                        <Route
                            exact
                            path="/profiles/:profileId/groups"
                            component={UserGroupListPage}
                        />
                        <Route
                            exact
                            path="/groups/:groupId"
                            component={GroupHomePage}
                        />
                        <Route
                            exact
                            path="/groups/:groupId/profile"
                            component={GroupProfilePage}
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
                            <Route
                                exact
                                path="/group/new"
                                component={NewGroupPage}
                            />
                        </AuthenticatedRoute>
                    </Switch>
                </BrowserRouter>
            </StoreProvider>
        </authContext.Provider>
    );
}

render(<App />, document.getElementById("app"));
