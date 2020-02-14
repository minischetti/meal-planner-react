import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { getProfileFrom, getWaitingStatusFrom } from "../redux/selectors";
import { login, logout } from "../redux/actions";
import { Link } from "react-router-dom";


export const Header = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();
    // const [user, initialising, error] = useAuthState(firebaseAuth);
    const profile = useSelector(state => getProfileFrom(state));
    const waiting = useSelector(state => getWaitingStatusFrom(state));

    const dispatchLoginAction = ({ email, password }) => {
        dispatch(login({ email, password }));
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
            <React.Fragment>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/recipes">Recipes</Link>
                <div>
                    <span>{profile.firstName}</span>
                    <button onClick={dispatchLogoutAction}>Log out</button>
                </div>
            </React.Fragment>
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