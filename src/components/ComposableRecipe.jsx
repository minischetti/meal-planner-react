import React, { useReducer, useState, Fragment } from "react";
import { css } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, deleteRecipe, resetRecipeResponse } from "../redux/actions";
import { BUTTON_TYPE, BUTTON_COLOR } from "./global/Button";
import { Button, TextField, FormSection, Spinner, FormContainer, FormSectionHeader, FormSectionActionBar, FormListRow, FormListHeader, FormSectionTitle, FormSectionContent, FormList, FormListContent } from "./global/global";
import { FORM_SECTION_CONTENT_STYLE } from "../components/global/forms/FormSectionContent";
import { useHistory } from "react-router";
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

export const FormFieldGroup = ({ children }) => {
    const style = css`
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
    `;
    return (
        <div css={style}>{children}</div>
    )
}

export const Checkbox = (({ checked = false, checkedCallback, label }) => {
    const base = css`
        -webkit-appearance: none;
        appearance: none;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        gap: 10px;
        align-items: center;
        cursor: pointer;
        user-select: none;
    `;

    const unchecked = css`
        ion-icon {
            opacity: .5;
        }
    `;

    const getStyles = () => {
        let styles = [base];

        if (!checked) {
            styles.push(unchecked);
        }

        return styles;
    }

    const handleClick = () => {
        checkedCallback(!checked);
    }

    const handleKeyUp = event => {
        /**
         * TODO: Scrolling occurs on spacebar press without preventDefault on keyDown event. With
         * it, the keyUp event doesn't fire.
         */
        //
        if (event.keyCode === 32) {
            checkedCallback(!checked);
        }
    }

    return (
        <div css={getStyles()} onClick={handleClick} onKeyPress={handleKeyUp} tabIndex="0">
            <ion-icon name="checkbox-outline" />
            <span>{label}</span>
        </div>
    )
});

export const ComposableRecipe = ({ recipeId = "", initialName = "", initialPrepTime = "", initialCookTime = "", initialIngredients = [], initialInstructions = [] }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const waiting = useSelector(state => getRecipeWaitingStatusFrom(state));
    const hasError = useSelector(state => getRecipeErrorStatusFrom(state));

    // New Recipe Name
    const [recipeName, setRecipeName] = useState(initialName);

    // New Recipe Prep Time
    const [prepTime, setPrepTime] = useState(initialPrepTime);

    // New Recipe Cook Time
    const [cookTime, setCookTime] = useState(initialCookTime);

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
        border-top: 1px solid #ddd;
    `;

    const itemCount = css`
        opacity: .5;
        font-weight: 400;
    `;

    const rowIcon = css`
        cursor: pointer;
        padding: 5px;
        justify-self: center;
    `;

    const emptyListText = css`
        margin-top: 20px;
    `;

    if (waiting) {
        return (
            <Spinner />
        )
    }

    return (
        <Fragment>
            {hasError ? "There was an error creating this recipe. Please try again." : ""}
            <FormContainer onSubmit={onSubmit}>
                <FormSection>
                    <FormSectionHeader>
                        <FormSectionTitle>Details</FormSectionTitle>
                    </FormSectionHeader>
                    <FormSectionContent style={FORM_SECTION_CONTENT_STYLE.NO_BORDER}>
                        <TextField value={recipeName} placeholder="Name" onChange={event => setRecipeName(event.target.value)} />
                        <FormFieldGroup>
                            <TextField value={prepTime} placeholder="Prep Time" onChange={event => setPrepTime(event.target.value)} />
                            <TextField value={cookTime} placeholder="Cook Time" onChange={event => setCookTime(event.target.value)} />
                        </FormFieldGroup>
                    </FormSectionContent>
                </FormSection>

                {/* Ingredients Form Section */}
                <FormSection>
                    <FormSectionHeader>
                        <FormSectionTitle>Ingredients{ingredients.length ? <span css={itemCount}>({ingredients.length})</span> : ""}</FormSectionTitle>
                        <FormSectionActionBar>
                            <TextField name="ingredientName" placeholder="Ingredient" value={ingredientName} onChange={event => setIngredientName(event.target.value)} />
                            <Checkbox label="Optional" checked={isIngredientOptional} checkedCallback={setIsIngredientOptional} />
                            <Button type={BUTTON_TYPE.BUTTON} onClick={() => dispatchIngredientAction({ type: ACTION.ADD, value: { description: ingredientName, optional: isIngredientOptional } })}>Add<ion-icon name="add-circle-outline"></ion-icon></Button>
                        </FormSectionActionBar>
                    </FormSectionHeader>
                    <FormSectionContent>
                        <FormList>
                            <FormListHeader>
                                <div>Number</div>
                                <div>Description</div>
                                <div>Optional</div>
                                <div></div>
                            </FormListHeader>
                            <FormListContent>
                                {!ingredients.length ? <div css={emptyListText}>Ingredients will appear in this list.</div> : ingredients.map((ingredient, index) => {
                                    return (
                                        <FormListRow key={index}>
                                            <div>{index + 1}</div>
                                            <div>{ingredient.description}</div>
                                            <div>{ingredient.optional ? "Yes" : "No"}</div>
                                            <div css={rowIcon} ><ion-icon onClick={() => dispatchIngredientAction({ type: ACTION.REMOVE, value: index })} name="trash-outline" /></div>
                                        </FormListRow>
                                    )
                                })}
                            </FormListContent>
                        </FormList>
                    </FormSectionContent>
                </FormSection>

                {/* Instructions Form Section */}
                <FormSection>
                    <FormSectionHeader>
                        <FormSectionTitle>Instructions{instructions.length ? <span css={itemCount}>({instructions.length})</span> : ""}</FormSectionTitle>
                        <FormSectionActionBar>
                            <TextField name="instructionName" placeholder="Instruction" value={instructionName} onChange={event => setInstructionName(event.target.value)} />
                            <Checkbox label="Optional" checked={isInstructionOptional} checkedCallback={isInstructionOptional} />
                            <Button type={BUTTON_TYPE.BUTTON} onClick={() => dispatchInstructionAction({ type: ACTION.ADD, value: { description: instructionName, optional: isInstructionOptional } })}>Add<ion-icon name="add-circle-outline"></ion-icon></Button>
                        </FormSectionActionBar>
                    </FormSectionHeader>
                    <FormSectionContent>
                        <FormList>
                            <FormListHeader>
                                <div>Number</div>
                                <div>Description</div>
                                <div>Optional</div>
                                <div></div>
                            </FormListHeader>
                            <FormListContent>
                                {!instructions.length ? <div css={emptyListText}>Instructions will appear in this list.</div> : instructions.map((instruction, index) => {
                                    return (
                                        <FormListRow key={index}>
                                            <div>{index + 1}</div>
                                            <div>{instruction.description}</div>
                                            <div>{instruction.optional ? "Yes" : "No"}</div>
                                            <div css={rowIcon} ><ion-icon onClick={() => dispatchInstructionAction({ type: ACTION.REMOVE, value: index })} name="trash-outline" /></div>
                                        </FormListRow>
                                    )
                                })}
                            </FormListContent>
                        </FormList>
                    </FormSectionContent>
                </FormSection>
                {/* Cancel and Save */}
                <div css={buttonActionBarStyle}>
                    {/* Show the delete recipe button if this recipe already exists */}
                    {recipeId ? <Button color={BUTTON_COLOR.RED} onClick={onDelete}>Delete<ion-icon name="trash-outline" /></Button> : ""}
                    <Button color={BUTTON_COLOR.BLUE} onClick={onCancel}>Cancel<ion-icon name="arrow-back-outline" /></Button>
                    <Button type={BUTTON_TYPE.SUBMIT} color={BUTTON_COLOR.GREEN}>Save<ion-icon name="save-outline" /></Button>
                </div>
            </FormContainer>
        </Fragment>
    );
}