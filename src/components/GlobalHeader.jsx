import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/core";
import { useForm } from "react-hook-form";
import { useAuthSession } from "../hooks";
import { Spinner } from "./ui/general";
import { TextField, Button } from "./ui/controls";
import { BUTTON_TYPE, BUTTON_COLOR } from "./ui/controls/Button";

export const GlobalHeader = () => {
    const { register, handleSubmit, errors } = useForm();
    const { user, authInProgress, signIn, signOut } = useAuthSession();

    const handleSignIn = ({ email, password }) => signIn(email, password);
    const handleSignOut = () => signOut();

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

    const formStyle = css`
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
    `;

    const linkContainer = () => {
        return (
            <div css={linkContainerStyle}>
                <Link css={link} to={`/profile/${user.uid}`}>
                    Profile
                </Link>
                <Link css={link} to={`/profile/${user.uid}/recipes/`}>
                    Recipes
                </Link>
            </div>
        );
    };

    const signOutButton = () => {
        return (
            <Button name="signOut" onClick={handleSignOut}>
                Sign Out
            </Button>
        );
    };

    const signInForm = () => {
        return (
            <form css={formStyle} onSubmit={handleSubmit(handleSignIn)}>
                <TextField
                    type="text"
                    placeholder="Email"
                    name="email"
                    defaultValue="domminischetti@gmail.com"
                    ref={register({
                        required: true,
                        pattern: /^\S+@\S+$/i
                    })}
                />
                <TextField
                    type="password"
                    placeholder="Password"
                    name="password"
                    defaultValue="password"
                    ref={register({ required: true })}
                />
                <Button
                    name="signIn"
                    type={BUTTON_TYPE.SUBMIT}
                    color={BUTTON_COLOR.GREEN}
                >
                    Sign In
                </Button>
            </form>
        );
    };

    const authPanel = () => {
        return (
            <div css={authPanelStyle}>
                {user ? signOutButton() : signInForm()}
            </div>
        );
    };

    return (
        <div css={headerStyle}>
            {authInProgress ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Link css={[link, titleStyle]} to="/">
                        Meal Planner
                    </Link>
                    {user ? linkContainer() : null}
                    {authPanel()}
                </Fragment>
            )}
        </div>
    );
};
