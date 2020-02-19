import * as React from "react";
import { useSelector } from "react-redux";
import { getAuthenticationStatusFrom } from "../redux/selectors";
import { AbstractPage } from "./AbstractPage";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";

export const RootPage = () => {
    const isAuthenticated = useSelector(state => getAuthenticationStatusFrom(state));

    return (
        <AbstractPage>
            {isAuthenticated ? <HomePage/> : <LoginPage/>}
        </AbstractPage>
    )
}