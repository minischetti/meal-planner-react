import * as React from "react";
import { useSelector } from "react-redux";
import { getAuthenticationStatusFrom } from "../redux/selectors";
import { Login } from "../components/Login";
import { Header } from "../components/Header";

export const Root = () => {
    const isAuthenticated = useSelector(state => getAuthenticationStatusFrom(state));

    return (
        <React.Fragment>
            {isAuthenticated ? <Header/> : <Login/>}
            <h1>Home</h1>
        </React.Fragment>
    )
}