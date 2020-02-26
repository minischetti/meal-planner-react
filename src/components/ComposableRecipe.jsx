import React, { useReducer, useState, Fragment } from "react";
import { css } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, deleteRecipe, resetRecipeResponse } from "../redux/actions";
import { BUTTON_TYPE, BUTTON_COLOR } from "./global/Button";
import { Button, TextField, ListRow, FormSection, Spinner } from "./global/global";
import { useHistory } from "react-router";
import { ListHeaderRow } from "./global/ListHeaderRow";
import { getRecipeWaitingStatusFrom, getRecipeErrorStatusFrom } from "../redux/selectors";
import { useEffect } from "react";

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

export const ComposableRecipe = ({ recipeId = "", initialName = "", initialIngredients = [], initialInstructions = [] }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const waiting = useSelector(state => getRecipeWaitingStatusFrom(state));
    const hasError = useSelector(state => getRecipeErrorStatusFrom(state));

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

    useEffect(() => {
        return () => {
            dispatch(resetRecipeResponse());
        }
    }, []);

    const onSubmit = event => {
        event.preventDefault();
        const payload = {
            name: recipeName,
            ingredients,
            instructions
        };

        dispatch(createRecipe(payload));

        if (!hasError) {
            history.push("/recipes");
        }
    }

    const onCancel = event => {
        event.preventDefault();

        return (
            history.push("/recipes")
        )
    }

    const onDelete = event => {
        event.preventDefault();

        dispatch(deleteRecipe(recipeId));
        history.push("/recipes");
    }

    const buttonActionBarStyle = css`
        display: grid;
        gap: 10px;
        padding: 20px;
        grid-template-columns: repeat(3, 1fr);
    `;

    if (waiting) {
        return (
            <Spinner />
        )
    }

    return (
        <Fragment>
            {hasError ? "There was an error creating this recipe. Please try again." : ""}
            <form onSubmit={onSubmit}>
                {/* Name */}
                <FormSection title="Details">
                    <TextField value={recipeName} onChange={event => setRecipeName(event.target.value)} />
                    {/* <TextField value={prepTime} onChange={event => setPrepTime(event.target.value)} /> */}
                    {/* <TextField value={cookTime} onChange={event => setCookTime(event.target.value)} /> */}
                </FormSection>

                {/* Ingredients Form Section */}
                <FormSection title="Ingredients">
                    {/* Ingredient List */}
                    <ListHeaderRow>
                        <div>Number</div>
                        <div>Description</div>
                        <div>Optional</div>
                        <div></div>
                    </ListHeaderRow>
                    {/* New Ingredient Form */}
                    <ListRow>
                        <div>{ingredients.length + 1}</div>
                        <TextField name="ingredientName" placeholder="Ingredient" value={ingredientName} onChange={event => setIngredientName(event.target.value)} />
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
                <FormSection title="Instructions">
                    {/* Header */}
                    <ListHeaderRow>
                        <div>Number</div>
                        <div>Description</div>
                        <div>Optional</div>
                        <div></div>
                    </ListHeaderRow>
                    {/* New Instruction Form */}
                    <ListRow>
                        <div>{instructions.length + 1}</div>
                        <TextField name="instructionName" placeholder="Instruction" value={instructionName} onChange={event => setInstructionName(event.target.value)} />
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
                {/* Cancel and Save */}
                <div css={buttonActionBarStyle}>
                    {/* Show the delete recipe button if this recipe already exists */}
                    {recipeId ? <Button color={BUTTON_COLOR.RED} onClick={onDelete}>Delete<ion-icon name="trash-outline" /></Button> : ""}
                    <Button color={BUTTON_COLOR.BLUE} onClick={onCancel}>Cancel<ion-icon name="arrow-back-outline" /></Button>
                    <Button type={BUTTON_TYPE.SUBMIT} color={BUTTON_COLOR.GREEN}>Save<ion-icon name="save-outline" /></Button>
                </div>
            </form>
        </Fragment>
    );
}