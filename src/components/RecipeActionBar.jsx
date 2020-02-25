import { Link } from "react-router-dom";
import { css } from "@emotion/core";
import { Button } from "./global/Button";

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
            {role ? <div>Your Role: {role}</div> : ""}
            <Link to={{pathname: `/recipes/${id}/edit`}}>
                <Button>
                    Edit Recipe
                    <ion-icon name="create-outline" class={iconStyle}></ion-icon>
                </Button>
            </Link>
        </div>
    )

}