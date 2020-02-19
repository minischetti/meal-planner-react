import React from "react";
import { css } from "@emotion/core";
import { loading } from "./global/loading";

export const LoadingContainer = ({ children }, waiting = false) => {
    const containerStyle = waiting ? css`
        transition: .5s all ease-in-out;
        opacity: .5;
        cursor: not-allowed;
        background-image: ${loading};
        ` : css`transition: .5s all ease-in-out;`;

    if (waiting) {
        return (
            <div css={containerStyle}>
                {loading}
                {children}
            </div>
        )
    }

    return (
        <div css={containerStyle}>
            {children}
        </div>
    )
}