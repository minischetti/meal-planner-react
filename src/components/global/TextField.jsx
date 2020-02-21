import React, { forwardRef } from "react";
import { css } from "@emotion/core";

export const TextField = forwardRef(({name, placeholder, defaultValue}, ref) => {
    const inputStyle = css`
        display: flex;
        -webkit-appearance: none;
        appearance: none;
        border: 1px solid cadetblue;
        border-radius: 4px;
        background-color: 1px solid aliceblue;
        padding: 10px 20px;
        font-size: 14px;
    `;

    return (
        <input css={inputStyle} type="text" name={name} placeholder={placeholder} defaultValue={defaultValue} ref={ref}/>
    )
});