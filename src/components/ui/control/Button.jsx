import React from "react";
import { css } from "@emotion/core";

export const Button = ({
    children,
    onClick,
    label,
    icon,
    iconPosition = BUTTON_CONFIGURATION.ICON.POSITION.RIGHT,
    type = BUTTON_CONFIGURATION.TYPE.BUTTON,
    color = BUTTON_CONFIGURATION.COLOR.DEFAULT
}) => {
    const buttonStyle = css`
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        border: 0;
        padding: 10px 20px;
        background-color: ${color};
        border-radius: 200px;
        color: black;
        font-size: 14px;
        // transition: 0.15s all ease-in-out;
        & ion-icon {
            margin-left: 5px;
            color: black;
            font-size: 16px;
        }
        &:hover {
            // transform: scale(1.025);
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
    `;

    if (children) {
        return (
            <button css={buttonStyle} type={type} onClick={onClick}>
                {children}
            </button>
        );
    }

    // FUTURE: Think about re-arranging with CSS.
    const getStyles = () => {
        const styles = [buttonStyle];

        if (iconPosition === BUTTON_CONFIGURATION.ICON.POSITION.RIGHT) {

        }
    }

    if (label) {
        return (
            <button css={buttonStyle} type={type} onClick={onClick}>
                {icon && iconPosition === BUTTON_CONFIGURATION.ICON.POSITION.LEFT ? icon : null}
                {label}
                {icon && iconPosition === BUTTON_CONFIGURATION.ICON.POSITION.RIGHT ? icon : null}
            </button>
        );
    }
};

export const BUTTON_CONFIGURATION = {
    TYPE: {
        BUTTON: "button",
        SUBMIT: "submit"
    },

    COLOR: {
        RED: "#ff4040",
        BLUE: "#40b5ff",
        GREEN: "#40ffbf",
        DEFAULT: "#ececec"
    },
    ICON: {
        POSITION: {
            LEFT: "left",
            RIGHT: "right"
        }
    }
};