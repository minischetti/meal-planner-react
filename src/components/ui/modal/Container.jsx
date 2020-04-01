import React from "react";
import { css } from "@emotion/core";

export const Container = ({ children }) => {
    const background = css`
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        z-index: 1;
        backdrop-filter: blur(10px);
    `;

    const modal = css`
        display: grid;
        gap: 20px;
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
