import React, {useContext} from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { GlobalStateContext, firebase, ACTION } from "../GlobalStateContext";

export const Login = () => {
    const { register, handleSubmit, errors } = useForm();
    const [user, initialising, error] = useAuthState(firebase.auth());
    const {state, dispatch} = useContext(GlobalStateContext);
    const login = ({ email, password }) => {
        dispatch({
            type: ACTION.LOGIN,
            payload: { email, password }
        });
    };
    const logout = () => {
        dispatch({ type: ACTION.LOGOUT });
    };

    if (initialising) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
    if (error || errors) {
        console.log({ error, errors });
    }
    if (user) {
        return (
            <div>
                <span>{user.email}</span>
                <button onClick={logout}>Log out</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(login)}>
            <input type="text" placeholder="Email" name="email" defaultValue="domminischetti@gmail.com" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
            <input type="password" placeholder="Password" name="password" defaultValue="password" ref={register({ required: true })} />

            <input type="submit" />
        </form>
    );
};