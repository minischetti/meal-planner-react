import * as React from "react";
import { AbstractPage } from "./containers";
import { Login } from "../components/components";
import { getAuthenticationStatusFrom } from "../redux/selectors";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export const LoginPage = () => {
    const isAuthenticated = useSelector(state => getAuthenticationStatusFrom(state));

    if (isAuthenticated) {
        return (
            <Redirect to={"/"}></Redirect>
        );
    }

    return (
        <AbstractPage>
            <h1>Login</h1>
            <Login />
        </AbstractPage>
    )
}