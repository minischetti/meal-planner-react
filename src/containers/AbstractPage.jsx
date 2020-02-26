import React from "react";
import { css } from "@emotion/core";

export const AbstractPage = ({ children }) => {
    const pageStyle = css `
        @media (min-width: 375px) {
            font-family: "Lato", sans-serif;
            transition: .5s all ease-in-out;
            display: grid;
            gap: 20px;
            width: 50%;
            margin: 0 auto;
        }
    `;

    return (
        <div css={pageStyle}>
            {children}
        </div>
    )
}