import React from "react";
import { css } from "@emotion/core";
import { Default } from "../../../themes";

export const Item = ({ children, onClick, style = ITEM_CONFIGURATION.STYLE.BORDER }) => {
    const containerStyle = css`
        padding: ${Default.padding.medium}px;
        border-radius: ${Default.borderRadius.medium}px;
        &:hover {
            box-shadow: 0 0 ${Default.boxShadow.size.medium} ${Default.boxShadow.color.light};
        }
    `;

    const addBorder = css`
        border: 1px solid #ddd;
    `;

    const addBackground = css`
        background-color: ${Default.backgroundColor.grayLight};
    `;

    const getStyles = () => {
        let styles = [containerStyle];
        const { BORDER, BACKGROUND } = ITEM_CONFIGURATION.STYLE;

        switch (style) {
            case BORDER:
                styles.push(addBorder);
                break;
            case BACKGROUND:
                styles.push(addBackground);
                break;
        }

        return styles;
    };

    return (
        <div css={getStyles} onClick={onClick}>
            {children}
        </div>
    );
};

export const ITEM_CONFIGURATION = {
    STYLE: {
        BORDER: "border",
        BACKGROUND: "background"
    }
};
