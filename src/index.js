import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Containers
import { Root } from "./containers/Root";
import { ProfilePage } from "./containers/ProfilePage";
import { RecipesPage } from "./containers/RecipesPage";
import { RecipePage } from "./containers/RecipePage";

// Selectors
// import { getAuthenticationStatusFrom } from "./redux/selectors";

// const AuthenticatedRoute = ({ children, ...rest }) => {
//     const isAuthenticated = useSelector(state => getAuthenticationStatusFrom(state));

//     return (
//         <Route
//             {...rest}
//             render={({ location }) =>
//                 isAuthenticated ? (
//                     children
//                 ) : (
//                         <Redirect
//                             to={{
//                                 pathname: "/login",
//                                 state: { from: location }
//                             }}
//                         />
//                     )
//             }
//         />
//     );
// }

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                {/* <Route path="/login" component={Login} /> */}
                <Route path="/profile" component={ProfilePage} />
                <Route path="/recipes" component={RecipesPage} />
                <Route path="/recipe/:recipeId" component={RecipePage} />
                <Route exact path="/" component={Root} />
            </Switch>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));