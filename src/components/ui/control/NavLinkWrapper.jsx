import React from "react";
import { css } from "@emotion/core";
import { NavLink } from "react-router-dom";

export const NavLinkWrapper = ({ to, exact, children }) => {
    const linkStyle = css`
        color: inherit;
        text-decoration: none;
        &.active {
            cursor: default;
            opacity: .5;
        }
    `;

    return <NavLink exact={exact} css={linkStyle} to={to}>{children}</NavLink>;
};
