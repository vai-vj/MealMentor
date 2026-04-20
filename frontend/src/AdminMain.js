import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/admin/recipes")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map(recipe => ({
          ...recipe,
          active: recipe.active === 1 //convert to boolean
        }));
        console.log("ADMIN DATA:", formatted);
        setRecipes(formatted);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  const handleToggle = async (id) => {
  try {
    await fetch(`http://127.0.0.1:5000/admin/toggle-recipe/${id}`, {
      method: "POST",
    });

    // refresh current page
    setRecipes(prev =>
      prev.map(r =>
        r.id === id ? { ...r, active: !r.active } : r
      )
    );

  } catch (err) {
    console.error(err);
  }
};

  const thStyle = {
    padding: "12px",
    textAlign: "left",
    fontSize: "16px",
    color: "white",
  };

  const tdStyle = {
    padding: "12px",
    fontSize: "15px",
    color: "#333",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF3E0",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* NAVBAR for ADMIN */}
      {/* <nav
        style={{
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          backgroundColor: "#FFF8E8",
          borderBottom: "1px solid #E6C68E",
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#6B3E1F" }}>
          Meal Mentors
        </div>

        <div style={{ display: "flex", gap: "30px" }}>
          <button
            onClick={() => navigate("/cooking")}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            User View
          </button>

          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#6B3E1F",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      </nav> */}

      {/* CONTENT */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "50px" }}>
        {/* Heading */}
        <h1 style={{ color: "#5f340e", marginBottom: "10px", fontSize: "42px" }}>
          Admin Dashboard
        </h1>

        <p style={{ color: "#7a5634", fontSize: "18px", marginBottom: "35px" }}>
          Browse recipes to add, edit, or delete.
        </p>

        {/* <pre>{JSON.stringify(recipes, null, 2)}</pre> */}

        {/* TABLE */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <thead style={{ backgroundColor: "#5f340e" }}>
            <tr>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Ingredients</th>
              <th style={thStyle}>Steps</th>
            </tr>
          </thead>

          <tbody>
            
            {recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleToggle(recipe.id)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: recipe.active ? "#4CAF50" : "#ccc",
                      color: "white",
                      fontWeight: "bold"
                    }}
                  >
                    {recipe.active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td style={tdStyle}>{recipe.id}</td>
                <td style={tdStyle}>{recipe.title}</td>
                <td style={tdStyle}>
                  {Array.isArray(recipe.ingredients)
                    ? recipe.ingredients.join(", ")
                    : "NO INGREDIENTS"}
                </td>
                <td style={tdStyle}>
                  {Array.isArray(recipe.steps)
                    ? recipe.steps.join(" | ")
                    : "NO STEPS"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;