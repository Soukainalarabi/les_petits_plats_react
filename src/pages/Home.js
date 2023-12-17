import React, { useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import logo from "../assets/logo.WebP"
import Search from "../components/Search";
import ButtonTags from "../components/ButtonTags";
import DropDowns from "../components/DropDowns"
import Card from "../components/Card";
import recipes from "../datas/recipes"
import {
    filteredIngredients,
    uniqueIngredient,
    generateIngredientTags,
    filtered,
    filteredRecipes,
} from "./utils";
const ContentStyled = styled.div`display: grid;
grid-template-columns: repeat(3, 1fr);
width: 667px;
max-height: 397px;
overflow: scroll;
margin-top: -1%;`


export default function Home() {
    const [contentIngredient, setContentIngredient] = useState(false);
    const [contentAppareil, setContentAppareil] = useState(false);
    const [contentUstensil, setContentUstensil] = useState(false);
    const [filteredRecipesState, setFilteredRecipes] = useState(recipes);
    const [filteredIngredientTag, setFilteredIngredientTag] = useState([]);
    const [buttontagAfficheIng, setButtontagAfficheIng] = useState(false);
    const [buttontagAfficheUst, setButtontagAfficheUst] = useState(false);
    const [allApplianceTag, setAllApplianceTag] = useState([]);
    const [uniqueApplianceTag, setUniqueApplianceTag] = useState([]);
    const [buttonTagAfficheAppliance, setButtonTagAfficheAppliance] = useState(false);
    const [filteredApplianceTag, setFilteredApplianceTag] = useState([]);
    const [allUstensilTag, setAllUstensilTag] = useState([]);

    const [allIngredientTag, setAllIngredientTag] = useState([]);
    const [filteredUstensilTag, setFilteredUstensilTag] = useState([]);
    const [uniqueUstensilTag, setUniqueUstensilTag] = useState([]);

    const [uniqueIngredientTag, setUniqueIngredientTag] = useState([]);
    const inputIngredient = useRef("rechercher un ingredient");
    const [searchValue, setSearchValue] = useState("");
    const [isModifIng, setIsModifIng] = useState(false);
    const [isModifApp, setIsModifApp] = useState(false);
    const [isModifUst, setIsModifUst] = useState(false);


    const handleImageClickIngredient = () => {

        setIsModifIng(!isModifIng);
        setIsModifApp(false);
        setIsModifUst(false);


    };
    const handleImageClickApp = () => {
        setIsModifApp(!isModifApp);
        setIsModifIng(false);
        setIsModifUst(false);
    };
    const handleImageClickUstensil = () => {

        setIsModifUst(!isModifUst);
        setIsModifApp(false);
        setIsModifIng(false);
    };

    const reset = () => {
        setSearchValue('');

    }
    const resetTag = (valueTag) => {
        setAllIngredientTag((prevState) => {
            const updatedState = prevState.filter((tag) => tag !== valueTag);
            // Utilisez la fonction de rappel pour effectuer une action après la mise à jour de l'état
            setFilteredIngredientTag((prevFilteredIngredientTag) => {
                // Vérifiez si updatedState est vide, puis réinitialisez à recipes
                if (updatedState.length === 0 && searchValue.trim() !== "") {
                    const recipesFiltered = filteredRecipes(searchValue);
                    setFilteredRecipes(recipesFiltered);
                    return recipesFiltered;
                } else if (updatedState.length === 0 || searchValue.trim() === "") {
                    // Si updatedState est vide ou searchValue est vide, réinitialisez à recipes
                    return recipes;
                } else {
                    // Filtrer les recettes en fonction des éléments restants dans updatedState
                    const filteredRecipesTag = recipes.filter((recipe) =>
                        recipe.ingredients.some((ingredient) =>
                            updatedState.includes(ingredient.ingredient.toLowerCase())
                        )
                    );

                    // Mettez à jour l'état des recettes filtrées
                    setFilteredRecipes(filteredRecipesTag);
                    return filteredRecipesTag;
                }
            });

            return updatedState;
        });
    };
    const handleInputGlobalChange = (newValue) => {
        // Filtrer la liste recipes en fonction de la nouvelle valeur
        const filteredAllRecipes = filtered(newValue);
        setSearchValue(newValue);
        if (newValue) {
            setFilteredRecipes(filteredAllRecipes);
            setContentIngredient(
                <ContentStyled>
                    {filteredAllRecipes.map((el) => (
                        el.ingredients.map((ingredient, index) => (
                            <p key={index} onClick={(e) => ingredientClick(e)}>{ingredient.ingredient}</p>
                        ))
                    ))}
                </ContentStyled>
            );
            console.log(contentIngredient);

        } else {
            // Mettez à jour le contenuIngredient lorsque searchValue n'existe pas
            setContentIngredient(
                <ContentStyled>
                    {recipes.map((recipe) => (
                        recipe.ingredients.map((ingredient, index) => (
                            <p key={index} onClick={(e) => ingredientClick(e)}>{ingredient.ingredient}</p>
                        ))
                    ))}
                </ContentStyled>
            );
            console.log(contentIngredient);
        }
    };
    const handleInputIngredientChange = () => {
        const filteredAllIngredients = filteredIngredients(inputIngredient.current.value)

        const filteredIngredientsArray = filteredAllIngredients

        const uniqueIngredients = uniqueIngredient(filteredIngredientsArray);
        const ingredientTags = generateIngredientTags(uniqueIngredients);

        setContentIngredient(
            <ContentStyled>
                {ingredientTags}
            </ContentStyled>
        );
        console.log("handleClick called with type:", filteredIngredients);

    };
    const ingredientClick = (e) => {
        console.log("Valeur du clic :", e.target.innerText);
        const valueTag = e && e.target.innerText;

        setAllIngredientTag((prevState) => {
            const updatedState = [...prevState, valueTag];
            const updatedUniqueIngredientTag = [...new Set(updatedState.map(el => el))];
            console.log("Valeur mise à jour :", updatedUniqueIngredientTag);

            setUniqueIngredientTag(updatedUniqueIngredientTag);
            return updatedUniqueIngredientTag;
        });

        setButtontagAfficheIng(true);

        const filteredTag = valueTag === "" ? recipes : recipes.filter((recipe) =>
            recipe.ingredients.some((ingredient) =>
                ingredient.ingredient.toLowerCase().includes(valueTag.toLowerCase())
            )

        );

        console.log(filteredTag);
        console.log(uniqueIngredientTag);
        setFilteredIngredientTag(filteredTag || []);
    };

    const ustensilClick = (e) => {
        console.log("Valeur du clic :", e.target.innerText);
        const valueTag = e && e.target.innerText;

        setAllUstensilTag((prevState) => {
            const updatedState = [...prevState, valueTag];
            const updatedUniqueUstensilTag = [...new Set(updatedState.map(el => el))];
            console.log("Valeur mise à jour :", updatedUniqueUstensilTag);

            setUniqueUstensilTag(updatedUniqueUstensilTag);
            return updatedUniqueUstensilTag;
        });

        setButtontagAfficheUst(true);

        const filteredUstensilTag = valueTag === "" ? recipes : recipes.filter((recipe) =>
            recipe.ustensils.some((ustensil) =>
                ustensil.toLowerCase().includes(valueTag.toLowerCase())
            )

        );
        console.log(filteredUstensilTag);
        console.log(uniqueUstensilTag);
        setFilteredUstensilTag(filteredUstensilTag || []);
    };

    const applianceClick = (e) => {
        console.log("Valeur du clic :", e.target.innerText);
        const valueTag = e && e.target.innerText;

        setAllApplianceTag((prevState) => {
            const updatedState = [...prevState, valueTag];
            const updatedUniqueApplianceTag = [...new Set(updatedState.map(el => el))];
            console.log("Valeur mise à jour :", updatedUniqueApplianceTag);

            setUniqueApplianceTag(updatedUniqueApplianceTag);
            return updatedUniqueApplianceTag;
        });

        setButtonTagAfficheAppliance(true);

        const filteredApplianceTag = valueTag === "" ? recipes : recipes.filter((recipe) =>
            recipe.appliance.toLowerCase().includes(valueTag.toLowerCase())
        );
        console.log(filteredApplianceTag);
        console.log(uniqueApplianceTag);
        setFilteredApplianceTag(filteredApplianceTag || []);
    };








    const handleClick = (type) => {
        console.log("handleClick called with type:", type);

        if (type === "ingredients" && inputIngredient.current) {
            setContentIngredient(
                <ContentStyled>
                    {recipes.map((recipe) => (
                        recipe.ingredients.map((ingredient, index) => (
                            <p key={index} onClick={(e) => ingredientClick(e)}>{ingredient.ingredient}</p>
                        ))
                    ))}
                </ContentStyled>
            );

        }
        if (type === "appareils") {
            setContentAppareil(

                <ContentStyled>
                    {recipes.map((recipe, index) => (
                                      <p key={index} onClick={(e) => applianceClick(e)}>{recipe.appliance}</p>

                    ))}
                </ContentStyled>

            );
        }
        if (type === "ustensils") {
            setContentUstensil(
                <ContentStyled>
                    {recipes.map((recipe) => (
                        recipe.ustensils.map((ustensil, index) => (
                            <p key={index} onClick={(e) => ustensilClick(e)}>{ustensil}</p>
                        ))
                    ))}
                </ContentStyled>
            );
        }
    };

    return (
        <>
            <div className="container">

                <div className="logo">
                    <img src={logo} alt=""
                    />
                </div>
                <Search onInputChange={handleInputGlobalChange} reset={reset} />
                <div className="buttonTag">

                <ButtonTags buttontagAffiche={buttontagAfficheIng} valueIngredientTags={allIngredientTag} type="ingredient"
                    resetTag={resetTag} />
                <ButtonTags buttontagAffiche={buttonTagAfficheAppliance} valueIngredientTags={allApplianceTag} type="appareil"
                    resetTag={resetTag} />
                <ButtonTags buttontagAffiche={buttontagAfficheUst} valueIngredientTags={allUstensilTag} type="ustensil"
                    resetTag={resetTag} />
                    </div>
                <>
                    <div className="dropdowns">
                        <DropDowns
                            title="Ingredients"
                            type="ingredients"
                            searchType="ingredient"
                            content="A"
                            value={contentIngredient}
                            onClick={() => handleClick("ingredients")}
                            onChange={handleInputIngredientChange}
                            inputRef={inputIngredient}
                            handleImageClick={handleImageClickIngredient}
                            isModif={isModifIng}

                        />
                        <DropDowns
                            title="Appareils"
                            type="appareils"
                            value={contentAppareil}
                            searchType="appareil"
                            content="B"
                            onClick={() => handleClick("appareils")}
                            handleImageClick={handleImageClickApp}
                            isModif={isModifApp}
                        />
                        <DropDowns
                            title="Ustensils"
                            type="ustensils"
                            value={contentUstensil}
                            searchType="ustensils"
                            content="C"
                            onClick={() => handleClick("ustensils")}
                            handleImageClick={handleImageClickUstensil}
                            isModif={isModifUst}


                        />
                    </div>
                </>

                <div className="cards" style={{ display: "grid" }}>
                {buttontagAfficheIng && !searchValue ? (
    // Condition 1: si buttontagAffiche est true et searchValue n'est pas vide
    <>
        {(filteredIngredientTag || []).map((recipe) => (
            <Card
                key={recipe.id}
                id={recipe.id}
                name={recipe.name}
                time={recipe.time}
                picture={recipe.picture}
                ingredients={recipe.ingredients.map((ingredient) => ({
                    ingredient: ingredient.ingredient,
                    quantity: ingredient.quantity,
                    unit: ingredient.unit ? ingredient.unit : "",
                }))}
                description={recipe.description}
            />
        ))}
    </>
) : buttontagAfficheUst && !searchValue ? (
    // Condition 2: si buttontagAfficheUst est true et searchValue n'est pas vide
    <div style={{ backgroundColor: "red", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {(filteredUstensilTag || []).map((recipe) => (
            <Card
                key={recipe.id}
                id={recipe.id}
                name={recipe.name}
                time={recipe.time}
                picture={recipe.picture}
                ingredients={recipe.ingredients.map((ingredient) => ({
                    ingredient: ingredient.ingredient,
                    quantity: ingredient.quantity,
                    unit: ingredient.unit ? ingredient.unit : "",
                }))}
                description={recipe.description}
            />
        ))}
    </div>
) : buttonTagAfficheAppliance && !searchValue ? (
    // Condition 2: si buttontagAfficheUst est true et searchValue n'est pas vide
    <div style={{ backgroundColor: "red", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {(filteredApplianceTag || []).map((recipe) => (
            <Card
                key={recipe.id}
                id={recipe.id}
                name={recipe.name}
                time={recipe.time}
                picture={recipe.picture}
                ingredients={recipe.ingredients.map((ingredient) => ({
                    ingredient: ingredient.ingredient,
                    quantity: ingredient.quantity,
                    unit: ingredient.unit ? ingredient.unit : "",
                }))}
                description={recipe.description}
            />
        ))}
    </div>
): searchValue.trim() === " " && !buttontagAfficheIng && !buttontagAfficheUst &&!buttonTagAfficheAppliance? (
    // Condition 3: quand searchValue est vide ou buttontagAffiche est true
    <div style={{ backgroundColor: "blue", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {recipes.map((recipe) => (
            <Card
                key={recipe.id}
                id={recipe.id}
                name={recipe.name}
                time={recipe.time}
                picture={recipe.picture}
                ingredients={recipe.ingredients.map((ingredient) => ({
                    ingredient: ingredient.ingredient,
                    quantity: ingredient.quantity,
                    unit: ingredient.unit ? ingredient.unit : "",
                }))}
                description={recipe.description}
            />
        ))}
    </div>
) : filteredRecipesState.length === 0 ? (
    // Condition 4: quand searchValue n'est pas vide et aucune recette ne correspond au critère de recherche
    <h3 id="message-erreur" style={{ display: "block" }}>
        Aucune recette ne correspond à votre critère… vous pouvez chercher d'autres recettes tels que « tarte aux pommes », « poisson »...
    </h3>
) : (
    // Condition 5: quand searchValue n'est pas vide et des recettes correspondent au critère de recherche
    <>
        {filteredRecipesState.map((recipe) => (
            <Card
                key={recipe.id}
                id={recipe.id}
                name={recipe.name}
                time={recipe.time}
                picture={recipe.picture}
                ingredients={recipe.ingredients.map((ingredient) => ({
                    ingredient: ingredient.ingredient,
                    quantity: ingredient.quantity,
                    unit: ingredient.unit ? ingredient.unit : "",
                }))}
                description={recipe.description}
            />
        ))}
    </>
)}
                </div>
            </div>
        </>
    );
}