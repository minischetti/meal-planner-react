import React from "react";
import { css } from "@emotion/core";

export const BUTTON_TYPE = {
    BUTTON: "button",
    SUBMIT: "submit"
}

export const BUTTON_COLOR = {
    RED: "#ff4040",
    BLUE: "#40b5ff",
    GREEN: "#40ffbf",
    DEFAULT: "#e5e5e5"
}

export const Button = ({children, type, onClick, color = BUTTON_COLOR.DEFAULT}) => {
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
        transition: .15s all ease-in-out;
        & ion-icon {
            margin-left: 5px;
            color: black;
            font-size: 16px;
        }
        &:hover {
            transform: scale(1.025);
            box-shadow: 0 0 20px rgba(0,0,0,.1);
        }
    `;

    return (
        <button css={buttonStyle} type={type} onClick={onClick}>{children}</button>
    )
}