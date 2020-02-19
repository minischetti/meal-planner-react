import * as React from "react";
import { useSelector } from "react-redux";
import { getAuthenticationStatusFrom } from "../redux/selectors";
import { Login } from "../components/Login";
import { Header } from "../components/Header";
import { Page } from "./Page";

export const Root = () => {
    const isAuthenticated = useSelector(state => getAuthenticationStatusFrom(state));

    return (
        <Page>
            {isAuthenticated ? <Header/> : <Login/>}
            <h1>Home</h1>
        </Page>
    )
}