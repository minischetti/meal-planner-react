import React from "react";
import { getAuthenticationStatusFrom } from "../redux/selectors";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { AbstractPage } from "../containers";
import { Login } from "../components";
import { PageActionBar } from "../components/ui/page";

export const LoginPage = () => {
    const isAuthenticated = useSelector(state =>
        getAuthenticationStatusFrom(state)
    );

    if (isAuthenticated) {
        return <Redirect to={"/"}></Redirect>;
    }

    return (
        <AbstractPage>
            <PageActionBar title="Login" />
            <Login />
        </AbstractPage>
    );
};
