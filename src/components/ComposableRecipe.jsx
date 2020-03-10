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
import { Control, Form, Loading } from "../components";

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
    initialRecipeYield = "",
    initialDescription = "",
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

    // New Recipe Yield
    const [recipeYield, setRecipeYield] = useState(initialRecipeYield);

    // New Recipe Description
    const [description, setDescription] = useState(initialDescription);

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
            recipeYield,
            description,
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

    const resetIngredientForm = () => {
        setIngredientName("");
        setIsIngredientOptional(false);
    };

    const handleAddIngredient = () => {
        dispatchIngredientAction({
            type: ACTION.ADD,
            value: {
                description: ingredientName,
                optional: isIngredientOptional
            }
        });
        resetIngredientForm();
    };

    const resetInstructionForm = () => {
        setInstructionName("");
        setIsInstructionOptional(false);
    };

    const handleAddInstruction = () => {
        dispatchInstructionAction({
            type: ACTION.ADD,
            value: {
                description: instructionName,
                optional: isInstructionOptional
            }
        });
        resetInstructionForm();
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
        return <Loading.Spinner />;
    }

    return (
        <Fragment>
            {hasError
                ? "There was an error creating this recipe. Please try again."
                : ""}
            <Form.Container onSubmit={onSubmit}>
                <Form.Section>
                    <Form.Section.Header>
                        <Form.Section.Title>Details</Form.Section.Title>
                    </Form.Section.Header>
                    <Form.Section.Container
                        style={FORM_SECTION_CONTENT_STYLE.NO_BORDER}
                    >
                        <Control.TextField
                            value={recipeName}
                            placeholder="Name"
                            onChange={event =>
                                setRecipeName(event.target.value)
                            }
                        />
                        <Form.FieldGroup>
                            <Control.TextField
                                value={prepTime}
                                placeholder="Prep Time"
                                onChange={event =>
                                    setPrepTime(event.target.value)
                                }
                            />
                            <Control.TextField
                                value={cookTime}
                                placeholder="Cook Time"
                                onChange={event =>
                                    setCookTime(event.target.value)
                                }
                            />
                            <Control.TextField
                                value={recipeYield}
                                placeholder="Yield"
                                onChange={event =>
                                    setRecipeYield(event.target.value)
                                }
                            />
                        </Form.FieldGroup>
                        <Control.TextArea
                            name="description"
                            value={description}
                            placeholder="Description"
                            onChange={event =>
                                setDescription(event.target.value)
                            }
                        />
                    </Form.Section.Container>
                </Form.Section>

                {/* Ingredients Form Section */}
                <Form.Section>
                    <Form.Section.Header>
                        <Form.Section.Title>
                            Ingredients
                            {ingredients.length ? (
                                <span css={itemCount}>
                                    ({ingredients.length})
                                </span>
                            ) : (
                                ""
                            )}
                        </Form.Section.Title>
                        <Form.Section.ActionBar>
                            <Control.TextField
                                name="ingredientName"
                                placeholder="Ingredient"
                                value={ingredientName}
                                onChange={event =>
                                    setIngredientName(event.target.value)
                                }
                            />
                            <Control.Checkbox
                                label="Optional"
                                checked={isIngredientOptional}
                                checkedCallback={setIsIngredientOptional}
                            />
                            <Control.Button
                                type={Control.BUTTON_TYPE.BUTTON}
                                onClick={handleAddIngredient}
                            >
                                Add
                                <ion-icon name="add-circle-outline"></ion-icon>
                            </Control.Button>
                        </Form.Section.ActionBar>
                    </Form.Section.Header>
                    <Form.Section.Content>
                        <Form.List.Container>
                            <Form.List.Header>
                                <div>Number</div>
                                <div>Description</div>
                                <div>Optional</div>
                                <div></div>
                            </Form.List.Header>
                            <Form.List.Content>
                                {!ingredients.length ? (
                                    <div css={emptyListText}>
                                        Ingredients will appear in this list.
                                    </div>
                                ) : (
                                    ingredients.map((ingredient, index) => {
                                        return (
                                            <Form.List.Row key={index}>
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
                                            </Form.List.Row>
                                        );
                                    })
                                )}
                            </Form.List.Content>
                        </Form.List.Container>
                    </Form.Section.Content>
                </Form.Section>

                {/* Instructions Form Section */}
                <Form.Section>
                    <Form.Section.Header>
                        <Form.Section.Title>
                            Instructions
                            {instructions.length ? (
                                <span css={itemCount}>
                                    ({instructions.length})
                                </span>
                            ) : (
                                ""
                            )}
                        </Form.Section.Title>
                        <Form.Section.ActionBar>
                            <Control.TextArea
                                name="instructionName"
                                placeholder="Instruction"
                                value={instructionName}
                                onChange={event =>
                                    setInstructionName(event.target.value)
                                }
                            />
                            <Control.Checkbox
                                label="Optional"
                                checked={isInstructionOptional}
                                checkedCallback={setIsInstructionOptional}
                            />
                            <Control.Button
                                type={Control.BUTTON_TYPE.BUTTON}
                                onClick={handleAddInstruction}
                            >
                                Add
                                <ion-icon name="add-circle-outline" />
                            </Control.Button>
                        </Form.Section.ActionBar>
                    </Form.Section.Header>
                    <Form.Section.Content>
                        <Form.List>
                            <Form.List.Header>
                                <div>Number</div>
                                <div>Description</div>
                                <div>Optional</div>
                                <div></div>
                            </Form.List.Header>
                            <Form.List.Content>
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
                            </Form.List.Content>
                        </Form.List>
                    </Form.Section.Content>
                </Form.Section>
                {/* Cancel and Save */}
                <div css={buttonActionBarStyle}>
                    {/* Show the delete recipe button if this recipe is being edited */}
                    {mode === COMPOSABLE_RECIPE_MODE.UPDATE ? (
                        <Control.Button
                            color={Control.BUTTON_COLOR.RED}
                            onClick={onDelete}
                        >
                            Delete
                            <ion-icon name="trash-outline" />
                        </Control.Button>
                    ) : (
                        ""
                    )}
                    <Control.Button
                        color={Control.BUTTON_COLOR.BLUE}
                        onClick={onCancel}
                    >
                        Cancel
                        <ion-icon name="arrow-back-outline" />
                    </Control.Button>
                    <Control.Button
                        type={Control.BUTTON_TYPE.SUBMIT}
                        color={Control.BUTTON_COLOR.GREEN}
                    >
                        Save
                        <ion-icon name="save-outline" />
                    </Control.Button>
                </div>
            </Form.Container>
        </Fragment>
    );
};
