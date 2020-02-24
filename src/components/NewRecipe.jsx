import React, { useReducer, useState } from "react";
import { css } from "@emotion/core";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CREATE_RECIPE_REQUEST, createRecipe } from "../redux/actions";
import { Button, BUTTON_TYPE } from "../components/global/Button";
import { TextField } from "./global/TextField";
import { ListRow } from "./global/ListRow";

const INGREDIENT_ACTION = {
    ADD: "ADD",
    REMOVE: "REMOVE"
};

const INSTRUCTION_ACTION = {
    ADD: "ADD",
    REMOVE: "REMOVE"
};

export const ingredientReducer = (previousState, action) => {
    switch (action.type) {
        case INGREDIENT_ACTION.ADD:
            return [...previousState, action.value];
        case INGREDIENT_ACTION.REMOVE:
            return previousState.filter((_, index) => index !== action.value);
        default:
            return previousState;
    }
};

export const instructionReducer = (previousState, action) => {
    switch (action.type) {
        case INSTRUCTION_ACTION.ADD:
            return [...previousState, action.value];
        case INSTRUCTION_ACTION.REMOVE:
            return previousState.filter((_, index) => index !== action.value);
        default:
            return previousState;
    }
};

export const NewRecipe = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors, control } = useForm();

    const [recipeName, setRecipeName] = useState("");
    const [ingredientName, setIngredientName] = useState("");
    const [isIngredientOptional, setIsIngredientOptional] = useState(false);
    const [ingredients, dispatchIngredientAction] = useReducer(ingredientReducer, []);

    const [instructionName, setInstructionName] = useState("");
    const [isInstructionOptional, setIsInstructionOptional] = useState(false);
    const [instructions, dispatchInstructionAction] = useReducer(instructionReducer, []);

    const listStyle = css`
        // display: grid;
        // gap: 10px;
        // border: 1px solid #e8e8e8;
    `;

    const listRowStyle = css`
        display: grid;
        grid-template-columns: 1fr 4fr 1fr 1fr;
        gap: 20px;
        align-items: center;
        padding: 20px;
        // background-color: #e8e8e8;
        &:not(:last-child) {
            border-bottom: 1px solid #e8e8e8;
        }
    `;

    const formSectionStyle = css`
        &:not(:first-of-type) {
            margin-top: 20px;
        }
    `;

    const formStyle = css`
        display: grid;
        gap: 10px;
    `;

    // if (errors && errors.length) {
    console.log("NewRecipe/formErrors", errors);
    // }

    const onSubmit = event => {
        event.preventDefault();
        const payload = {
            name: recipeName,
            ingredients,
            instructions
        };

        dispatch(createRecipe(payload));
    }

    return (
        <form onSubmit={onSubmit}>
            {/* Name */}
            <div css={formSectionStyle}>
                <div>
                    <h2>Name</h2>
                </div>
                <TextField value={recipeName} onChange={event => setRecipeName(event.target.value)} />
            </div>

            {/* Ingredients Section */}

            <div css={formSectionStyle}>
                <h2>Ingredients</h2>
                {/* Ingredient List */}
                <div>
                    {/* Form Header */}
                    <ListRow>
                        <div>Number</div>
                        <div>Description</div>
                        <div>Optional</div>
                        <div></div>
                    </ListRow>
                    {/* New Ingredient Form */}
                    <ListRow>
                        <div>{ingredients.length + 1}</div>
                        <TextField name="ingredientName" placeholder="Name" value={ingredientName} onChange={event => setIngredientName(event.target.value)} />
                        <input type="checkbox" name="isIngredientOptional" checked={isIngredientOptional} onChange={event => setIsIngredientOptional(event.target.checked)} />
                        <Button type={BUTTON_TYPE.BUTTON} onClick={() => dispatchIngredientAction({ type: INGREDIENT_ACTION.ADD, value: { description: ingredientName, optional: isIngredientOptional } })}>Add<ion-icon name="add-circle-outline"></ion-icon></Button>
                    </ListRow>
                    {/* Existing Ingredient List */}
                    {ingredients.map((ingredient, index) => {
                        return (
                            <ListRow key={index}>
                                <div>{index + 1}</div>
                                <div>{ingredient.description}</div>
                                <div>{String(ingredient.optional)}</div>
                                <Button type={BUTTON_TYPE.BUTTON} onClick={() => dispatchIngredientAction({ type: INGREDIENT_ACTION.REMOVE, value: index })}>Remove<ion-icon name="trash-outline"></ion-icon></Button>
                            </ListRow>
                        )
                    })}
                </div>
            </div>
            <div css={formSectionStyle}>
                <h2>Instructions</h2>
                {/* Instruction List */}
                <div>
                    {/* Form Header */}
                    <ListRow>
                        <div>Number</div>
                        <div>Description</div>
                        <div>Optional</div>
                        <div></div>
                    </ListRow>
                    {/* New Instruction Form */}
                    <ListRow>
                        <div>{instructions.length + 1}</div>
                        <TextField name="instructionName" placeholder="Name" value={instructionName} onChange={event => setInstructionName(event.target.value)} />
                        <input type="checkbox" name="isInstructionOptional" checked={isInstructionOptional} onChange={event => setIsInstructionOptional(event.target.checked)} />
                        <Button type={BUTTON_TYPE.BUTTON} onClick={() => dispatchInstructionAction({ type: INSTRUCTION_ACTION.ADD, value: { description: instructionName, optional: isInstructionOptional } })}>Add<ion-icon name="add-circle-outline"></ion-icon></Button>
                    </ListRow>
                    {/* Existing Ingredient List */}
                    {instructions.map((instruction, index) => {
                        return (
                            <ListRow key={index}>
                                <div>{index + 1}</div>
                                <div>{instruction.description}</div>
                                <div>{String(instruction.optional)}</div>
                                <Button type={BUTTON_TYPE.BUTTON} onClick={() => dispatchInstructionAction({ type: INSTRUCTION_ACTION.REMOVE, value: index })}>Remove<ion-icon name="trash-outline"></ion-icon></Button>
                            </ListRow>
                        )
                    })}
                </div>
            </div>
            {/* Save */}
            <div>
                <Button type="submit">Save Recipe<ion-icon name="save-outline"></ion-icon></Button>
            </div>
        </form>
    );
}