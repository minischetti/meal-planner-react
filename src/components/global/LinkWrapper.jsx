import React from "react";
import { css } from "@emotion/core";
import { Link } from "react-router-dom";

export const LinkWrapper = ({to, children}) => {
    const linkStyle = css`
        color: inherit;
        text-decoration: none;
    `;

    return (
        <Link css={linkStyle} to={to}>{children}</Link>
    )
}