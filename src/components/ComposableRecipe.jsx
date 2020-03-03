import React, { useReducer, useState, Fragment } from "react";
import { css } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import {
    createRecipe,
    deleteRecipe,
    resetRecipeResponse,
    updateRecipe
} from "../redux/actions";
import { useHistory } from "react-router";
import {
    getRecipeWaitingStatusFrom,
    getRecipeErrorStatusFrom
} from "../redux/selectors";
import { useEffect } from "react";
import { Spinner } from "./ui/general";
import {
    Button,
    BUTTON_TYPE,
    BUTTON_COLOR,
    Checkbox,
    TextField
} from "./ui/controls";
import {
    FormContainer,
    FormSection,
    FormSectionHeader,
    FormSectionContent,
    FormSectionActionBar,
    FormListRow,
    FormListHeader,
    FormSectionTitle,
    FormList,
    FormListContent,
    FormFieldGroup,
    FORM_SECTION_CONTENT_STYLE
} from "./ui/forms";

const ACTION = {
    ADD: "ADD",
    REMOVE: "REMOVE"
};

export const COMPOSABLE_RECIPE_MODE = {
    CREATE: "CREATE",
    UPDATE: "UPDATE"
};

const reducer = (previousState, action) => {
    switch (action.type) {
        case ACTION.ADD:
            return [...previousState, action.value];
        case ACTION.REMOVE:
            return previousState.filter((_, index) => index !== action.value);
        default:
            return previousState;
    }
};

export const ComposableRecipe = ({
    recipeId = "",
    initialName = "",
    initialPrepTime = "",
    initialCookTime = "",
    initialContributors = [],
    initialIngredients = [],
    initialInstructions = [],
    mode = COMPOSABLE_RECIPE_MODE.CREATE
}) => {
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

    // New Contributor State
    const [contributor, setContributor] = useState({});

    // Contributor List Reducer
    const [contributors, dispatchContributorAction] = useReducer(
        reducer,
        initialContributors
    );

    // New Ingredient State
    const [ingredientName, setIngredientName] = useState("");
    const [isIngredientOptional, setIsIngredientOptional] = useState(false);

    // Ingredient List Reducer
    const [ingredients, dispatchIngredientAction] = useReducer(
        reducer,
        initialIngredients
    );

    // New Instruction State
    const [instructionName, setInstructionName] = useState("");
    const [isInstructionOptional, setIsInstructionOptional] = useState(false);

    // Instruction List Reducer
    const [instructions, dispatchInstructionAction] = useReducer(
        reducer,
        initialInstructions
    );

    useEffect(() => {
        return () => {
            dispatch(resetRecipeResponse());
        };
    }, []);

    const onSubmit = event => {
        event.preventDefault();
        const payload = {
            recipeId,
            name: recipeName,
            prepTime,
            cookTime,
            ingredients,
            instructions
        };

        let action;

        switch (mode) {
            case COMPOSABLE_RECIPE_MODE.CREATE:
                action = createRecipe;
                break;
            case COMPOSABLE_RECIPE_MODE.UPDATE:
                action = updateRecipe;
                break;
        }

        dispatch(action(payload));

        if (!hasError) {
            // TODO: Push to the new recipe's page
            history.push("/recipes");
        }
    };

    const onCancel = event => {
        event.preventDefault();

        return history.push("/recipes/" + recipeId);
    };

    const onDelete = event => {
        event.preventDefault();

        dispatch(deleteRecipe(recipeId));
        history.push("/recipes");
    };

    const buttonActionBarStyle = css`
        display: grid;
        gap: 10px;
        padding: 20px;
        grid-template-columns: repeat(3, 1fr);
        border-top: 1px solid #ddd;
    `;

    const itemCount = css`
        opacity: 0.5;
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
        return <Spinner />;
    }

    return (
        <Fragment>
            {hasError
                ? "There was an error creating this recipe. Please try again."
                : ""}
            <FormContainer onSubmit={onSubmit}>
                <FormSection>
                    <FormSectionHeader>
                        <FormSectionTitle>Details</FormSectionTitle>
                    </FormSectionHeader>
                    <FormSectionContent
                        style={FORM_SECTION_CONTENT_STYLE.NO_BORDER}
                    >
                        <TextField
                            value={recipeName}
                            placeholder="Name"
                            onChange={event =>
                                setRecipeName(event.target.value)
                            }
                        />
                        <FormFieldGroup>
                            <TextField
                                value={prepTime}
                                placeholder="Prep Time"
                                onChange={event =>
                                    setPrepTime(event.target.value)
                                }
                            />
                            <TextField
                                value={cookTime}
                                placeholder="Cook Time"
                                onChange={event =>
                                    setCookTime(event.target.value)
                                }
                            />
                        </FormFieldGroup>
                    </FormSectionContent>
                </FormSection>

                {/* Contributor Form Section */}
                {/*
                <FormSection>
                    <FormSectionHeader>
                        <FormSectionTitle>
                            Contributors
                            {contributors.length ? (
                                <span css={itemCount}>
                                    ({contributors.length})
                                </span>
                            ) : (
                                ""
                            )}
                        </FormSectionTitle>
                        <FormSectionActionBar>
                            <TextField
                                name="contributorName"
                                placeholder="Contributor"
                                value={contributor}
                                onChange={event =>
                                    setContributor(event.target.value)
                                }
                            />
                            <Button
                                type={BUTTON_TYPE.BUTTON}
                                onClick={() =>
                                    dispatchContributorAction({
                                        type: ACTION.ADD,
                                        value: {
                                            id: contributor,
                                        }
                                    })
                                }
                            >
                                Add
                                <ion-icon name="add-circle-outline"></ion-icon>
                            </Button>
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
                                {!ingredients.length ? (
                                    <div css={emptyListText}>
                                        Ingredients will appear in this list.
                                    </div>
                                ) : (
                                    ingredients.map((ingredient, index) => {
                                        return (
                                            <FormListRow key={index}>
                                                <div>{index + 1}</div>
                                                <div>
                                                    {ingredient.description}
                                                </div>
                                                <div>
                                                    {ingredient.optional
                                                        ? "Yes"
                                                        : "No"}
                                                </div>
                                                <div css={rowIcon}>
                                                    <ion-icon
                                                        onClick={() =>
                                                            dispatchIngredientAction(
                                                                {
                                                                    type:
                                                                        ACTION.REMOVE,
                                                                    value: index
                                                                }
                                                            )
                                                        }
                                                        name="trash-outline"
                                                    />
                                                </div>
                                            </FormListRow>
                                        );
                                    })
                                )}
                            </FormListContent>
                        </FormList>
                    </FormSectionContent>
                </FormSection>
                */}

                {/* Ingredients Form Section */}
                <FormSection>
                    <FormSectionHeader>
                        <FormSectionTitle>
                            Ingredients
                            {ingredients.length ? (
                                <span css={itemCount}>
                                    ({ingredients.length})
                                </span>
                            ) : (
                                ""
                            )}
                        </FormSectionTitle>
                        <FormSectionActionBar>
                            <TextField
                                name="ingredientName"
                                placeholder="Ingredient"
                                value={ingredientName}
                                onChange={event =>
                                    setIngredientName(event.target.value)
                                }
                            />
                            <Checkbox
                                label="Optional"
                                checked={isIngredientOptional}
                                checkedCallback={setIsIngredientOptional}
                            />
                            <Button
                                type={BUTTON_TYPE.BUTTON}
                                onClick={() =>
                                    dispatchIngredientAction({
                                        type: ACTION.ADD,
                                        value: {
                                            description: ingredientName,
                                            optional: isIngredientOptional
                                        }
                                    })
                                }
                            >
                                Add
                                <ion-icon name="add-circle-outline"></ion-icon>
                            </Button>
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
                                {!ingredients.length ? (
                                    <div css={emptyListText}>
                                        Ingredients will appear in this list.
                                    </div>
                                ) : (
                                    ingredients.map((ingredient, index) => {
                                        return (
                                            <FormListRow key={index}>
                                                <div>{index + 1}</div>
                                                <div>
                                                    {ingredient.description}
                                                </div>
                                                <div>
                                                    {ingredient.optional
                                                        ? "Yes"
                                                        : "No"}
                                                </div>
                                                <div css={rowIcon}>
                                                    <ion-icon
                                                        onClick={() =>
                                                            dispatchIngredientAction(
                                                                {
                                                                    type:
                                                                        ACTION.REMOVE,
                                                                    value: index
                                                                }
                                                            )
                                                        }
                                                        name="remove-circle-outline"
                                                    />
                                                </div>
                                            </FormListRow>
                                        );
                                    })
                                )}
                            </FormListContent>
                        </FormList>
                    </FormSectionContent>
                </FormSection>

                {/* Instructions Form Section */}
                <FormSection>
                    <FormSectionHeader>
                        <FormSectionTitle>
                            Instructions
                            {instructions.length ? (
                                <span css={itemCount}>
                                    ({instructions.length})
                                </span>
                            ) : (
                                ""
                            )}
                        </FormSectionTitle>
                        <FormSectionActionBar>
                            <TextField
                                name="instructionName"
                                placeholder="Instruction"
                                value={instructionName}
                                onChange={event =>
                                    setInstructionName(event.target.value)
                                }
                            />
                            <Checkbox
                                label="Optional"
                                checked={isInstructionOptional}
                                checkedCallback={setIsInstructionOptional}
                            />
                            <Button
                                type={BUTTON_TYPE.BUTTON}
                                onClick={() =>
                                    dispatchInstructionAction({
                                        type: ACTION.ADD,
                                        value: {
                                            description: instructionName,
                                            optional: isInstructionOptional
                                        }
                                    })
                                }
                            >
                                Add
                                <ion-icon name="add-circle-outline" />
                            </Button>
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
                                {!instructions.length ? (
                                    <div css={emptyListText}>
                                        Instructions will appear in this list.
                                    </div>
                                ) : (
                                    instructions.map((instruction, index) => {
                                        return (
                                            <FormListRow key={index}>
                                                <div>{index + 1}</div>
                                                <div>
                                                    {instruction.description}
                                                </div>
                                                <div>
                                                    {instruction.optional
                                                        ? "Yes"
                                                        : "No"}
                                                </div>
                                                <div css={rowIcon}>
                                                    <ion-icon
                                                        onClick={() =>
                                                            dispatchInstructionAction(
                                                                {
                                                                    type:
                                                                        ACTION.REMOVE,
                                                                    value: index
                                                                }
                                                            )
                                                        }
                                                        name="remove-circle-outline"
                                                    />
                                                </div>
                                            </FormListRow>
                                        );
                                    })
                                )}
                            </FormListContent>
                        </FormList>
                    </FormSectionContent>
                </FormSection>
                {/* Cancel and Save */}
                <div css={buttonActionBarStyle}>
                    {/* Show the delete recipe button if this recipe is being edited */}
                    {mode === COMPOSABLE_RECIPE_MODE.UPDATE ? (
                        <Button color={BUTTON_COLOR.RED} onClick={onDelete}>
                            Delete
                            <ion-icon name="trash-outline" />
                        </Button>
                    ) : (
                        ""
                    )}
                    <Button color={BUTTON_COLOR.BLUE} onClick={onCancel}>
                        Cancel
                        <ion-icon name="arrow-back-outline" />
                    </Button>
                    <Button
                        type={BUTTON_TYPE.SUBMIT}
                        color={BUTTON_COLOR.GREEN}
                    >
                        Save
                        <ion-icon name="save-outline" />
                    </Button>
                </div>
            </FormContainer>
        </Fragment>
    );
};
