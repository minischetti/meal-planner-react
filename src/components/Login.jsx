import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { requestAccount } from "../redux/actions";
import { BUTTON_TYPE, BUTTON_COLOR } from "./ui/controls/Button";
import { TextField, Button } from "./ui/controls";
import { css } from "@emotion/core";

export function Login() {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();

    const dispatchLoginAction = ({ email, password }) => {
        dispatch(requestAccount({ email, password }));
    };

    const formStyle = css`
        display: grid;
        gap: 10px;
        justify-content: center;
    `;

    return (
        <form css={formStyle} onSubmit={handleSubmit(dispatchLoginAction)}>
            <TextField type="text" placeholder="Email" name="email" defaultValue="domminischetti@gmail.com" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
            <TextField type="password" placeholder="Password" name="password" defaultValue="password" ref={register({ required: true })} />
            <Button name="login" type={BUTTON_TYPE.SUBMIT} color={BUTTON_COLOR.GREEN}>Log in</Button>
        </form>
    );
};