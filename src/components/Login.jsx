import * as React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { store, firebase, ACTION } from "../store";

export function Login() {
    const { register, handleSubmit, errors } = useForm();
    const [user, initialising, error] = useAuthState(firebase.auth());
    const globalState = React.useContext(store);
    const { dispatch } = globalState;
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
                <p>Current User: {user.email}</p>
                <button onClick={logout}>Log out</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(login)}>
            <input type="text" placeholder="Email" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
            <input type="password" placeholder="Password" name="password" ref={register({ required: true })} />

            <input type="submit" />
        </form>
    );
};