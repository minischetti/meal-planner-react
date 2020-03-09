import React, { forwardRef } from "react";
import { css } from "@emotion/core";

export const TextArea = forwardRef(
    ({ name, placeholder, value, defaultValue, onChange }, ref) => {
        const inputStyle = css`
            display: flex;
            -webkit-appearance: none;
            appearance: none;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 10px 20px;
            font-size: 14px;
            resize: vertical;
        `;

        return (
            <textarea
                css={inputStyle}
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                defaultValue={defaultValue}
                ref={ref}
            ></textarea>
        );
    }
);
