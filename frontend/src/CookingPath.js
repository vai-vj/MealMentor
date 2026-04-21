import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CookingPath() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF3E0",
        padding: "50px",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ color: "#5f340e", marginBottom: "10px", fontSize: "42px" }}>
          Recipes
        </h1>

        <p style={{ color: "#7a5634", fontSize: "18px", marginBottom: "35px" }}>
          Browse recipes and select one to view more details.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "28px",
          }}
        >
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                backgroundColor: "#FFF8E8",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 8px 20px rgba(95, 52, 14, 0.08)",
                border: "1px solid #E6C68E",
                cursor: "pointer",
              }}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <div style={{ padding: "20px" }}>
                <h2
                  style={{
                    color: "#5f340e",
                    fontSize: "28px",
                    margin: "0 0 18px 0",
                    lineHeight: "1.2",
                  }}
                >
                  {recipe.title}
                </h2>

                <button
                  onClick={() => navigate('/recipe-detail', { state: { recipe } })}
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    padding: "12px",
                    background: "linear-gradient(90deg, #674303, #664400)",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CookingPath;