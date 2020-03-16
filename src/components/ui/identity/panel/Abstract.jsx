import React from "react";
import { css } from "@emotion/core";

export const Abstract = ({ image, name, withBorder = false, children }) => {
    const containerStyle = css`
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
        align-items: center;
        justify-content: flex-start;
        & ion-icon {
            width: 40px;
            height: 40px;
        }
    `;

    const nameStyle = css`
        font-weight: bold;
    `;

    const withBorderStyle = css`
        border: 1px solid  #ddd;
        border-radius: 8px;
        padding: 20px;
    `;

    const getStyles = () => {
        let styles = [containerStyle];

        if (withBorder) {
            styles.push(withBorderStyle);
        }

        return styles;
    }

    return (
        <div css={getStyles()}>
            {children}
            <span css={nameStyle}>{name}</span>
        </div>
    );
};
