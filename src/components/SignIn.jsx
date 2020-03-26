import React from "react";
import { useForm } from "react-hook-form";
import { css } from "@emotion/core";
import { useAuthSession } from "../hooks";
import { Control } from "../components";

export function SignIn() {
    const { register, handleSubmit, errors } = useForm();
    const { user, signIn, signOut } = useAuthSession();

    const handleSignIn = ({ email, password }) => {
        signIn(email, password);
    };

    const formStyle = css`
        display: grid;
        gap: 10px;
        justify-content: center;
    `;

    return (
        <form css={formStyle} onSubmit={handleSubmit(handleSignIn)}>
            <Control.TextField
                type="text"
                placeholder="Email"
                name="email"
                defaultValue="domminischetti@gmail.com"
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            <Control.TextField
                type="password"
                placeholder="Password"
                name="password"
                defaultValue="password"
                ref={register({ required: true })}
            />
            <Control.Button
                name="signIn"
                type={Control.BUTTON_CONFIGURATION.TYPE.SUBMIT}
                color={Control.BUTTON_CONFIGURATION.COLOR.GREEN}
            >
                Sign in
            </Control.Button>
        </form>
    );
}
