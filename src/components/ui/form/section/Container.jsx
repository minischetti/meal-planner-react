import React from "react";
import { css } from "@emotion/core";

export const Container = ({ children }) => {
    const container = css`
        display: grid;
        gap: 20px;
    `;

    return <div css={container}>{children}</div>;
};
