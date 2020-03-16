import React from "react";
import { css } from "@emotion/core";

export const Container = ({ children }) => {
    const background = css`
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.25);
        width: 100%;
        height: 100%;
        z-index: 1;
    `;

    const modal = css`
        position: absolute;
        top: 50%;
        left: 50%;
        display: grid;
        gap: 20px;
        transform: translate(-50%, -50%);
        background-color: white;
        box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 20px;
    `;

    return (
        <div css={background}>
            <div css={modal}>{children}</div>
        </div>
    );
};
