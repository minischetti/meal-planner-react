import React from "react";
import { css } from "@emotion/core";

export const BUTTON_TYPE = {
    BUTTON: "button",
    SUBMIT: "submit"
}

export const Button = ({children, type, onClick}) => {
    const buttonStyle = css`
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        border: 0;
        padding: 10px 20px;
        background-color: aquamarine;
        border-radius: 200px;
        color: black;
        font-size: 14px;
        & ion-icon {
            margin-left: 5px;
            color: black;
            font-size: 16px;
        }
    `;

    return (
        <button css={buttonStyle} type={type} onClick={onClick}>{children}</button>
    )
}