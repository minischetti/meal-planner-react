import * as React from "react";
import {Login} from "./Login";
import {Profile} from "./Profile";
import {GlobalStateProvider} from "../GlobalStateContext";

export const App = () => {
    return (
        <GlobalStateProvider>
            <Login/>
            <Profile/>
        </GlobalStateProvider>
    )
}