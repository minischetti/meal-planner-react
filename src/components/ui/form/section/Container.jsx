import React from "react";
import { css } from "@emotion/core";

export const Container = ({ children }) => {
    const style = css`
        display: grid;
        gap: 20px;
    `;

    return <div css={style}>{children}</div>;
};
