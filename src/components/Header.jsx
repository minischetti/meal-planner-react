import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfileFrom, getUserWaitingStatusFrom, getUserIdFrom } from "../redux/selectors";
import { logout, requestProfile } from "../redux/actions";
import { Link } from "react-router-dom";
import { css } from "@emotion/core";


export const Header = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => getUserIdFrom(state));
    const profile = useSelector(state => getProfileFrom(state));
    const waiting = useSelector(state => getUserWaitingStatusFrom(state));

    useEffect(() => {
        dispatch(requestProfile(userId));
    }, []);

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

    const header = css`
        display: flex;
        padding: 20px;
        border-radius: 8px;
        background-color: aliceblue;
    `;

    const authPanel = css`
        justify-self: end;
        margin-left: auto;
    `;

    return (
        <div css={header}>
            <div>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/recipes">Recipes</Link>
            </div>
            <div css={authPanel}>
                {profile ? <span>{profile.firstName}</span> : ""}
                <button onClick={dispatchLogoutAction}>Log out</button>
            </div>
        </div>
    );
};