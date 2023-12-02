import React,{ useState } from "react";
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
    const [searchValue, setSearchValue] = useState("Rechercher une recette");

   

    const reset =()=>{
        setSearchValue('');

    }
    const handleInputChange = (newValue) => {
        
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

 setFilteredRecipes(filtered);
 console.log("Recettes filtrées :", filtered);

 // Si la nouvelle valeur est vide, réinitialiser à la liste complète de recettes
 setSearchValue(newValue);
 console.log("Recettes filtrées :", newValue);

    };
    const handleClick = (type) => {
        console.log("handleClick called with type:", type);

        if (type === "ingredients") {
            setContenuIngredient(
                <ContentStyled>
                    {recipes.map((recipe) => (
                        recipe.ingredients.map((ingredient, index) => (
                            <p key={index}>{ingredient.ingredient}</p>
                        ))
                    ))}
                </ContentStyled>
            );
            setContenuAppareil(false);
            setContenuUstensil(false);
        } else if (type === "appareils") {
            setContenuAppareil(
                <ContentStyled>
                    {recipes.map((recipe, index) => (
                        <p key={index}>{recipe.appliance}</p>
                    ))}
                </ContentStyled>
            );
            setContenuIngredient(false);
            setContenuUstensil(false);
        } else if (type === "ustensils") {
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
            <Search onInputChange={handleInputChange} reset={reset} />
            <ButtonTags />
            <div className="dropdowns">
                <DropDowns
                    title="Ingredients"
                    type="ingredients"
                    searchType="ingredient"
                    content="A"
                    value={contenuIngredient}
                    onClick={() => handleClick("ingredients")}
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
            {searchValue === "Rechercher une recette" ? (
    // Condition 1: quand searchValue est vide
    <>
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
    </>
  ) :
                filteredRecipes.length === 0 ? (
                    <h3 id="message-erreur" style={{ display: "block" }}> Aucune recette ne correspond à votre critère… vous pouvez chercher d'autres recettes tels que « tarte aux pommes », « poisson »..."</h3>

                ) :
                
                (filteredRecipes.map((recipe) => (
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
                    ))
                )
               }
            </div>
        </>
    );
}