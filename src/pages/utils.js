import recipes from "../datas/recipes";

export const filteredIngredients = (inputIngredient) =>
  recipes.flatMap((recipe) =>
    recipe.ingredients
      .filter((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(inputIngredient.toLowerCase())
      )
      .map((ingredient, index) => ({
        id: `${recipe.id}-${index}`,
        ingredientValue: ingredient.ingredient,
      })
    )
  );

export const uniqueIngredient = (filteredIngredients) => [
  ...new Set(filteredIngredients.map((filteredIngredient) => filteredIngredient.ingredientValue)),
];
export const newTab = uniqueIngredient.map((ingredient => <p key={ingredient}>{ingredient}</p>)) 

export const generateIngredientTags = (uniqueIngredient) =>
  uniqueIngredient.map((ingredient) => <p key={ingredient}>{ingredient}</p>);

export const filtered = (newValue) =>
  newValue === "Rechercher une recette"
    ? recipes
    : recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(newValue.toLowerCase()) ||
        recipe.ingredients.some(
          (ingredient) =>
            ingredient.ingredient.toLowerCase().includes(newValue.toLowerCase())
        ) ||
        recipe.appliance.toLowerCase().includes(newValue.toLowerCase()) ||
        recipe.ustensils.some((ustensil) =>
          ustensil.toLowerCase().includes(newValue.toLowerCase())
        )
      );

export const filteredRecipes = (searchValue) =>
  recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    recipe.ingredients.some(
      (ingredient) => ingredient.ingredient.toLowerCase().includes(searchValue.toLowerCase())
    ) ||
    recipe.appliance.toLowerCase().includes(searchValue.toLowerCase()) ||
    recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(searchValue.toLowerCase()))
  );