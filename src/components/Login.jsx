import React, {useContext} from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {firebaseApp, firebaseAuth} from "../firebase";
import * as ACTION from "../redux/actions";
import {getProfile, isWaiting} from "../redux/selectors";
import {login, logout} from "../redux/actions";


export const Login = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();
    // const [user, initialising, error] = useAuthState(firebaseAuth);
    const profile = useSelector(state => getProfile(state));
    const waiting = useSelector(state => isWaiting(state));

    const dispatchLoginAction = ({ email, password }) => {
        dispatch(login({email, password}));
    };

    const dispatchLogoutAction = () => {
        dispatch(logout());
    };

    if (waiting) {
        return (
            <div>Loading...</div>
        )
    }

    // if (initialising) {
    //     return (
    //         <div>
    //             <p>Loading...</p>
    //         </div>
    //     );
    // }

    // if (error || errors) {
    // }

    if (profile) {
        return (
            <div>
                <span>{profile.firstName}</span>
                <button onClick={dispatchLogoutAction}>Log out</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(dispatchLoginAction)}>
            <input type="text" placeholder="Email" name="email" defaultValue="domminischetti@gmail.com" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
            <input type="password" placeholder="Password" name="password" defaultValue="password" ref={register({ required: true })} />

            <input type="submit" name="login" />
        </form>
    );
};