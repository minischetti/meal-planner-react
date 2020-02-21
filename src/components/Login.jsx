import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { requestAccount } from "../redux/actions";
import { Button, BUTTON_TYPE } from "./global/Button";
import { TextField } from "./global/TextField";
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
            <Button name="login" type={BUTTON_TYPE.SUBMIT}>Log in</Button>
        </form>
    );
};