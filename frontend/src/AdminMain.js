function AdminPage() {
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
            padding: "50px",
            fontFamily: "Arial, sans-serif",
            boxSizing: "border-box",
        }}
    >
        {/* Heading & Subheading text */}
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ color: "#5f340e", marginBottom: "10px", fontSize: "42px" }}>
            Admin Dashboard
        </h1>
        <p style={{ color: "#7a5634", fontSize: "18px", marginBottom: "35px" }}>
          Browse recipes to add, edit, or delete.
        </p>
        </div>

        {/* Recipe Table */}
            <div>
                <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                >{/* HEADER */}
          <thead style={{ backgroundColor: "#5f340e", color: "white" }}>
            <tr>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Ingredients</th>
              <th style={thStyle}>Steps</th>
            </tr>
          </thead>
          </table>
            </div>
    </div>
  );
}



export default AdminPage;