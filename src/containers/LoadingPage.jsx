import React from "react";
import { Loading } from "../components";
import { css } from "@emotion/core";

export const LoadingPage = () => {
    const style = css`
        display: flex;
        width: 100%;
        height: 100%;
    `;

    return (
        <div css={style}>
            <Loading.Spinner />
        </div>
    );
};
