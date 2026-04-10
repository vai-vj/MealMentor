import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RecipeDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const recipe = location.state?.recipe;

  if (!recipe) {
    return <div>No recipe data found.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h1>{recipe.title}</h1>

      <img
        src={recipe.image}
        alt={recipe.title}
        style={{ width: "300px", borderRadius: "10px" }}
      />

      <h3>Prep Time: {recipe.prepTime}</h3>
      <h3>Cook Time: {recipe.cookTime}</h3>
      <h3>Total Time: {recipe.totalTime}</h3>

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <ol>
        {recipe.steps?.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetail;