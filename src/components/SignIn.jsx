import React from "react";
import { useForm } from "react-hook-form";
import { BUTTON_TYPE, BUTTON_COLOR } from "./ui/controls/Button";
import { TextField, Button } from "./ui/controls";
import { css } from "@emotion/core";
import { useAuth } from "../hooks/useAuth";
import { useAuthSession } from "../hooks";

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
            <TextField
                type="text"
                placeholder="Email"
                name="email"
                defaultValue="domminischetti@gmail.com"
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
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
                Sign in
            </Button>
        </form>
    );
}
