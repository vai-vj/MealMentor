import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RecipeDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [saveMessage, setSaveMessage] = useState("");

  const recipe = location.state?.recipe;

  const handleSaveRecipe = async () => {
    const userId = localStorage.getItem('mealMentorUserId');
    
    if (!userId) {
      setSaveMessage("Please log in first!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/track-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, recipe_id: recipe.id }),
      });

      const data = await response.json();
      setSaveMessage(data.message);
    } catch (error) {
      console.error(error);
      setSaveMessage("Failed to connect to backend.");
    }
  };

  if (!recipe) {
    return <div>No recipe data found.</div>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF3E0",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          backgroundColor: "#FFF8E8",
          borderRadius: "20px",
          padding: "30px",
          border: "1px solid #E6C68E",
          boxShadow: "0 8px 20px rgba(95, 52, 14, 0.08)",
        }}
      >
        <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: "10px 16px",
              background: "transparent",
              color: "#674303",
              border: "2px solid #674303",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Back
          </button>
          
          <button
            onClick={handleSaveRecipe}
            style={{
              padding: "10px 16px",
              background: "linear-gradient(90deg, #674303, #664400)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Save Recipe
          </button>
          
          <span style={{ alignSelf: "center", color: "#5f340e", fontWeight: "bold" }}>
            {saveMessage}
          </span>
        </div>

        <h1 style={{ color: "#5f340e", marginBottom: "20px" }}>{recipe.title}</h1>

        <img
          src={recipe.image}
          alt={recipe.title}
          style={{
            width: "100%",
            maxWidth: "500px",
            borderRadius: "14px",
            marginBottom: "25px",
            display: "block",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "14px",
            marginBottom: "30px",
            color: "#7a5634",
          }}
        >
          <div><strong>Servings:</strong> {recipe.servings || "--"}</div>
        </div>

        <h2 style={{ color: "#5f340e" }}>Ingredients</h2>
        <ul style={{ color: "#7a5634", lineHeight: "1.8", marginBottom: "30px" }}>
          {recipe.ingredients?.length > 0 ? (
            recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))
          ) : (
            <li>No ingredients available.</li>
          )}
        </ul>

        <h2 style={{ color: "#5f340e" }}>Instructions</h2>
        <ol style={{ color: "#7a5634", lineHeight: "1.8" }}>
          {recipe.steps?.length > 0 ? (
            recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))
          ) : (
            <li>No instructions available.</li>
          )}
        </ol>
      </div>
    </div>
  );
}

export default RecipeDetail;