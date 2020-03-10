import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { css } from "@emotion/core";
import { useAuthSession } from "../hooks";
import { Spinner } from "./ui/loading";
import { Button, NavLinkWrapper } from "./ui/control";
import {Control, Loading} from "../components";

export const GlobalHeader = () => {
    const { user, authInProgress, signIn, signOut } = useAuthSession();
    const history = useHistory();

    const headerStyle = css`
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        gap: 20px;
        padding: 20px;
        border-radius: 8px;
        border: 1px solid #ddd;
    `;

    const titleStyle = css`
        font-weight: bold;
    `;

    const authPanelStyle = css`
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
        justify-self: end;
    `;

    const linkContainerStyle = css`
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: max-content;
        gap: 10px;
        justify-content: center;
        text-decoration: none;
    `;

    const link = css`
        text-decoration: none;
    `;

    const linkContainer = () => {
        return (
            <div css={linkContainerStyle}>
                <Control.NavLinkWrapper exact css={link} to={`/profiles/${user.uid}`}>
                    My Home
                </Control.NavLinkWrapper>
                <Control.NavLinkWrapper exact css={link} to={`/profiles/${user.uid}/profile`}>
                    My Profile
                </Control.NavLinkWrapper>
                <Control.NavLinkWrapper
                    exact
                    css={link}
                    to={`/profiles/${user.uid}/groups/`}
                >
                    My Groups
                </Control.NavLinkWrapper>
                <Control.NavLinkWrapper
                    exact
                    css={link}
                    to={`/profiles/${user.uid}/recipes/`}
                >
                    My Recipes
                </Control.NavLinkWrapper>
            </div>
        );
    };

    const handleSignIn = () => history.push("/login");
    const signInButton = () => {
        return (
            <Control.Button name="signIn" onClick={handleSignIn}>
                Sign In
                <ion-icon name="log-in-outline"></ion-icon>
            </Control.Button>
        );
    };

    const handleSignOut = () => signOut();
    const signOutButton = () => {
        return (
            <Control.Button name="signOut" onClick={handleSignOut}>
                Sign Out
                <ion-icon name="log-out-outline"></ion-icon>
            </Control.Button>
        );
    };

    const authPanel = () => {
        return (
            <div css={authPanelStyle}>
                {user ? signOutButton() : signInButton()}
            </div>
        );
    };

    return (
        <div css={headerStyle}>
            {authInProgress ? (
                <Loading.Spinner />
            ) : (
                <Fragment>
                    <Control.LinkWrapper css={[link, titleStyle]} to="/">
                        Meal Planner
                    </Control.LinkWrapper>
                    {user ? linkContainer() : null}
                    {authPanel()}
                </Fragment>
            )}
        </div>
    );
};
