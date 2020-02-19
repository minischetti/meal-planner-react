import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { requestAccount } from "../redux/actions"

export function Login() {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();

    const dispatchLoginAction = ({ email, password }) => {
        dispatch(requestAccount({ email, password }));
    };

    return (
        <form onSubmit={handleSubmit(dispatchLoginAction)}>
            <input type="text" placeholder="Email" name="email" defaultValue="domminischetti@gmail.com" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
            <input type="password" placeholder="Password" name="password" defaultValue="password" ref={register({ required: true })} />
            <input type="submit" name="login" />
        </form>
    );
};