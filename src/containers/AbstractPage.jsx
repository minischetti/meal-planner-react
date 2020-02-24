import React from "react";
import { css } from "@emotion/core";

export const AbstractPage = ({ children }) => {
    const pageStyle = css `
        @media (min-width: 375px) {
            transition: .5s all ease-in-out;
            display: grid;
            gap: 20px;
            width: 60%;
            margin: 0 auto;
        }
    `;

    return (
        <div css={pageStyle}>
            {children}
        </div>
    )
}