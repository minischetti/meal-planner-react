import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfileFrom, getUserWaitingStatusFrom, getUserIdFrom } from "../redux/selectors";
import { logout, requestProfile } from "../redux/actions";
import { Link } from "react-router-dom";
import { css } from "@emotion/core";


export const GlobalHeader = () => {
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

    const header = css`
        display: grid;
        grid-auto-flow: column;
        padding: 20px;
        border-radius: 8px;
        border: 1px solid #ddd;
    `;

    const authPanel = css`
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
        justify-self: end;
    `;

    const linkContainer = css`
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: max-content;
        gap: 10px;
        text-decoration: none;
    `;

    const link = css`
        text-decoration: none;
    `;

    return (
        <div css={header}>
            <div css={linkContainer}>
                <Link css={link} to="/">Home</Link>
                <Link css={link} to="/profile">Profile</Link>
                <Link css={link} to="/recipes">Recipes</Link>
            </div>
            <div css={authPanel}>
                {profile ? <span>{profile.firstName}</span> : ""}
                <button onClick={dispatchLogoutAction}>Log out</button>
            </div>
        </div>
    );
};