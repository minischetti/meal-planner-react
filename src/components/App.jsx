import * as React from "react";
import {Login} from "./Login";
import {Profile} from "./Profile";

export const App = () => {
    return (
        <React.Fragment>
            <Login/>
            <Profile/>
        </React.Fragment>
    )
}