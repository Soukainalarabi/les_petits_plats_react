import React, { useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import logo from "../assets/logo.WebP"
import Search from "../components/Search";
import ButtonTags from "../components/ButtonTags";
import DropDowns from "../components/DropDowns"
import Card from "../components/Card";
import recipes from "../datas/recipes"
const ContentStyled = styled.div`display: grid;
grid-template-columns: repeat(3, 1fr);
width: 667px;
max-height: 397px;
overflow: scroll;
margin-top: -1%;`


export default function Home() {
    const [contenuIngredient, setContenuIngredient] = useState(false);
    const [contenuAppareil, setContenuAppareil] = useState(false);
    const [contenuUstensil, setContenuUstensil] = useState(false);
    const [filteredRecipes, setFilteredRecipes] = useState(recipes);
    const [filteredIngredientTag, setFilteredIngredientTag] = useState(recipes)
    const [buttontagAffiche, setButtontagAffiche] = useState(false)
    const [allIngredientTag, setAllIngredientTag] = useState([])
    const [uniqueIngredientTag, setUniqueIngredientTag] = useState([]);
    const inputIngredient = useRef("rechercher un ingredient")
    const [searchValue, setSearchValue] = useState("");


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
              const filteredRecipes = recipes.filter((recipe) =>
                recipe.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                recipe.ingredients.some(
                  (ingredient) =>
                    ingredient.ingredient.toLowerCase().includes(searchValue.toLowerCase())
                ) ||
                recipe.appliance.toLowerCase().includes(searchValue.toLowerCase()) ||
                recipe.ustensils.some((ustensil) =>
                  ustensil.toLowerCase().includes(searchValue.toLowerCase())
                )
              );
              setFilteredRecipes(filteredRecipes);
              return filteredRecipes;
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
        const filtered = newValue === "Rechercher une recette"
            ? recipes
            : recipes.filter((recipe) =>
                recipe.name.toLowerCase().includes(newValue.toLowerCase()) ||
                recipe.ingredients.some(
                    (ingredient) =>
                        ingredient.ingredient
                            .toLowerCase()
                            .includes(newValue.toLowerCase())
                ) ||
                recipe.appliance.toLowerCase().includes(newValue.toLowerCase()) ||
                recipe.ustensils.some((ustensil) =>
                    ustensil.toLowerCase().includes(newValue.toLowerCase())
                )
            );
    
        setSearchValue(newValue);
    
        if (searchValue) {
            setFilteredRecipes(filtered);
            setContenuIngredient(
                <ContentStyled>
                    {filtered.map((el) => (
                        el.ingredients.map((ingredient, index) => (
                            <p key={index} onClick={(e) => ingredientClick(e)}>{ingredient.ingredient}</p>
                        ))
                    ))}
                </ContentStyled>
            );
            console.log(contenuIngredient);
        } else {
            // Mettez à jour le contenuIngredient lorsque searchValue n'existe pas
            
            setContenuIngredient(
                <ContentStyled>
                    {recipes.map((recipe) => (
                        recipe.ingredients.map((ingredient, index) => (
                            <p key={index} onClick={(e) => ingredientClick(e)}>{ingredient.ingredient}</p>
                        ))
                    ))}
                </ContentStyled>
            );
            console.log(contenuIngredient);
        }
    };
    const handleInputIngredientChange = () => {
        const filteredIngredients = recipes.flatMap((recipe) =>
            recipe.ingredients
                .filter((ingredient) =>
                    ingredient.ingredient.toLowerCase().includes(inputIngredient.current.value.toLowerCase())
                )
                .map((ingredient, index) => ({
                    id: `${recipe.id}-${index}`,
                    ingredientValue: ingredient.ingredient,
                })
                ));
        // Utiliser new Set pour obtenir une liste d'ingrédients uniques
        const uniqueIngredient = [...new Set(filteredIngredients.map(filteredIngredient => filteredIngredient.ingredientValue))]
        const newTab = uniqueIngredient.map((ingredient => <p key={ingredient}>{ingredient}</p>))
            setContenuIngredient(
                <ContentStyled>
                    {newTab}
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

        setButtontagAffiche(true);

        const filteredTag = valueTag === "" ? recipes : recipes.filter((recipe) =>
            recipe.ingredients.some((ingredient) =>
                ingredient.ingredient.toLowerCase().includes(valueTag.toLowerCase())
            )

        );

        console.log(filteredTag);
        console.log(uniqueIngredientTag);
        setFilteredIngredientTag(filteredTag || []);
    };
    const handleClick = (type) => {
        console.log("handleClick called with type:", type);

        if (type === "ingredients" && inputIngredient.current) {
            setContenuIngredient(
                <ContentStyled>
                    {recipes.map((recipe) => (
                        recipe.ingredients.map((ingredient, index) => (
                            <p key={index} onClick={(e) => ingredientClick(e)}>{ingredient.ingredient}</p>
                        ))
                    ))}
                </ContentStyled>
            );
            setContenuAppareil(false);
            setContenuUstensil(false);
        }
        if (type === "appareils") {
            setContenuAppareil(
                <ContentStyled>
                    {recipes.map((recipe, index) => (
                        <p key={index}>{recipe.appliance}</p>
                    ))}
                </ContentStyled>
            );
            setContenuIngredient(false);
            setContenuUstensil(false);
        }
        if (type === "ustensils") {
            setContenuUstensil(
                <ContentStyled>
                    {recipes.map((recipe) => (
                        recipe.ustensils.map((ustensil, index) => (
                            <p key={index}>{ustensil}</p>
                        ))
                    ))}
                </ContentStyled>
            );
            setContenuIngredient(false);
            setContenuAppareil(false);
        }
    };
    return (
        <>
            <div className="logo">
                <img src={logo} alt=""
                />
            </div>
            <Search onInputChange={handleInputGlobalChange} reset={reset} />
            <ButtonTags buttontagAffiche={buttontagAffiche} valueIngredientTags={allIngredientTag}
                resetTag={resetTag} />
            <div className="dropdowns">
                <DropDowns
                    title="Ingredients"
                    type="ingredients"
                    searchType="ingredient"
                    content="A"
                    value={contenuIngredient}
                    onClick={() => handleClick("ingredients")}
                    onChange={handleInputIngredientChange}
                    inputRef={inputIngredient}
                />
                <DropDowns
                    title="Appareils"
                    type="appareils"
                    value={contenuAppareil}
                    searchType="appareil"
                    content="B"
                    onClick={() => handleClick("appareils")}
                />
                <DropDowns
                    title="Ustensils"
                    type="ustensils"
                    value={contenuUstensil}
                    searchType="ustensils"
                    content="C"
                    onClick={() => handleClick("ustensils")}
                />
            </div>


            <div className="cards" style={{ display: "grid" }}>
  {buttontagAffiche && !searchValue ? (
    // Condition 1: si buttontagAffiche est true et searchValue n'est pas vide
    <div style={{ backgroundColor: "red", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
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
    </div>
  ) : searchValue.trim() === "" || buttontagAffiche ? (
    // Condition 2: quand searchValue est vide ou buttontagAffiche est true
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
  ) : filteredRecipes.length === 0 ? (
    // Condition 3: quand searchValue n'est pas vide et aucune recette ne correspond au critère de recherche
    <h3 id="message-erreur" style={{ display: "block" }}>
      Aucune recette ne correspond à votre critère… vous pouvez chercher d'autres recettes tels que « tarte aux pommes », « poisson »...
    </h3>
  ) : (
    // Condition 4: quand searchValue n'est pas vide et des recettes correspondent au critère de recherche
    <div style={{ backgroundColor: "pink", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
      {filteredRecipes.map((recipe) => (
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
  )}
</div>
        </>
    );
}