import React from "react";
import { css } from "@emotion/core";

export const Container = ({ children }) => {
    const style = css`
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 20px;
    `;

    return <div css={style}>{children}</div>;
};
