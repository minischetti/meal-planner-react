import React, { useReducer, useState } from "react";
import { css } from "@emotion/core";
import { useDispatch } from "react-redux";
import { createRecipe } from "../redux/actions";
import { BUTTON_TYPE } from "./global/Button";
import { Button, TextField, ListRow, FormSection } from "./global/global";

const ACTION = {
    ADD: "ADD",
    REMOVE: "REMOVE"
}

export const reducer = (previousState, action) => {
    switch (action.type) {
        case ACTION.ADD:
            return [...previousState, action.value];
        case ACTION.REMOVE:
            return previousState.filter((_, index) => index !== action.value);
        default:
            return previousState;
    }
};

export const ComposableRecipe = ({initialName = "", initialIngredients = [], initialInstructions = []}) => {
    const dispatch = useDispatch();

    // New Recipe Name
    const [recipeName, setRecipeName] = useState(initialName);

    // New Ingredient State
    const [ingredientName, setIngredientName] = useState("");
    const [isIngredientOptional, setIsIngredientOptional] = useState(false);

    // Ingredient List Reducer
    const [ingredients, dispatchIngredientAction] = useReducer(reducer, initialIngredients);

    // New Instruction State
    const [instructionName, setInstructionName] = useState("");
    const [isInstructionOptional, setIsInstructionOptional] = useState(false);

    // Instruction List Reducer
    const [instructions, dispatchInstructionAction] = useReducer(reducer, initialInstructions);

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
            <FormSection>
                <h2>Name</h2>
                <TextField value={recipeName} onChange={event => setRecipeName(event.target.value)} />
            </FormSection>

            {/* Ingredients Form Section */}
            <FormSection>
                <h2>Ingredients</h2>
                {/* Ingredient List */}
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
                    <Button type={BUTTON_TYPE.BUTTON} onClick={() => dispatchIngredientAction({ type: ACTION.ADD, value: { description: ingredientName, optional: isIngredientOptional } })}>Add<ion-icon name="add-circle-outline"></ion-icon></Button>
                </ListRow>
                {/* Existing Ingredient List */}
                {!ingredients.length ? "No ingredients" : ingredients.map((ingredient, index) => {
                    return (
                        <ListRow key={index}>
                            <div>{index + 1}</div>
                            <div>{ingredient.description}</div>
                            <div>{String(ingredient.optional)}</div>
                            <Button type={BUTTON_TYPE.BUTTON} onClick={() => dispatchIngredientAction({ type: ACTION.REMOVE, value: index })}>Remove<ion-icon name="trash-outline"></ion-icon></Button>
                        </ListRow>
                    )
                })}
            </FormSection>

            {/* Instructions Form Section */}
            <FormSection>
                <h2>Instructions</h2>
                {/* Header */}
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
                    <Button type={BUTTON_TYPE.BUTTON} onClick={() => dispatchInstructionAction({ type: ACTION.ADD, value: { description: instructionName, optional: isInstructionOptional } })}>Add<ion-icon name="add-circle-outline"></ion-icon></Button>
                </ListRow>
                {/* Existing Instruction List */}
                {!instructions.length ? "No instructions" : instructions.map((instruction, index) => {
                    return (
                        <ListRow key={index}>
                            <div>{index + 1}</div>
                            <div>{instruction.description}</div>
                            <div>{String(instruction.optional)}</div>
                            <Button type={BUTTON_TYPE.BUTTON} onClick={() => dispatchInstructionAction({ type: ACTION.REMOVE, value: index })}>Remove<ion-icon name="trash-outline"></ion-icon></Button>
                        </ListRow>
                    )
                })}
            </FormSection>
            {/* Save */}
            <div>
                <Button type="submit">Save Recipe<ion-icon name="save-outline"></ion-icon></Button>
            </div>
        </form>
    );
}