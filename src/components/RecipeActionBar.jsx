import { Link } from "react-router-dom";
import { css } from "@emotion/core";

export const RecipeActionBar = ({id, role}) => {
    const containerStyle = css`
        display: flex;
        justify-content: space-between;
        padding: 20px;
        background-color: aliceblue;
        border-radius: 8px;
    `;

    const iconStyle = css`
        color: black;
    `;

    return (
        <div css={containerStyle}>
            <div>Your Role: {role}</div>
            <Link to={{pathname: `/recipes/${id}/edit`}}>
                <ion-icon name="create-outline" class={iconStyle}></ion-icon>
            </Link>
        </div>
    )

}