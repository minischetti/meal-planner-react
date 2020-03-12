import React from "react";
import { css } from "@emotion/core";

export const Container = ({ children }) => {
    const AREA = {
        LEFT: "left",
        CENTER: "center",
        RIGHT: "right"
    };

    const style = css`
        display: grid;
        gap: 10px;
        padding: 20px;
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas: "${AREA.LEFT} ${AREA.CENTER} ${AREA.RIGHT}"
        border-top: 1px solid #ddd;
    `;

    return <div css={style}>{children}</div>;
};
