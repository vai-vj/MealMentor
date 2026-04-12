import { useState } from "react";
import CookingPath from "./CookingPath";
import AdminPage from "./AdminMain";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [page, setPage] = useState("login");

  console.log("AdminPage import is:", AdminPage);

  const handleLogin = async () => {
    try {
      // send a POST request with the username and password
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // if the backend says success change the page to the cooking path
      if (response.ok) {

        //HARDCODED ADMIN LOGIN to admin page
        if (username === "admin" && password === "admin123") {
          setMessage("Admin login successful.");
          setPage("admin");
        }
        //General user login to cooking path
        else{
          setMessage(data.message);
          setPage("cooking");
        }
        
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to connect to backend. Is Flask running?");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // show the message and clear the password so they can log in
        setMessage(data.message);
        setPassword("");
      } else {
        // failed
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to connect to backend.");
    }
  };

  //logout functionality
  const handleLogout = () => {
    setUsername("");
    setPassword("");
    setMessage("You have been logged out.");
    setPage("login");
  };

  if (page === "admin") {
    return (
      <div>
        <nav
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
              onClick={() => setPage("cooking")}
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
        </nav>

        <AdminPage />
      </div>
    );
  }


  if (page === "cooking") {
    return (
      <div>
        <nav
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
              onClick={() => setPage("cooking")}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              Cooking Path
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
        </nav>

        <CookingPath />
      </div>
    );
  }

  return (
    <div>
      <nav
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
            onClick={() => setPage("login")}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            Login
          </button>

          {/* <button
            onClick={() => setPage("cooking")}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            Cooking Path
          </button> */}
        </div>
      </nav>

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#FAF3E0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial, sans-serif",
          padding: "30px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1100px",
            minHeight: "650px",
            backgroundColor: "white",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            display: "flex",
          }}
        >
          <div
            style={{
              flex: 1,
              padding: "50px 40px",
              backgroundColor: "#FFF8E8",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "12px",
                backgroundColor: "#5f340e",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                marginBottom: "24px",
              }}
            >
              MM
            </div>

            <p
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                letterSpacing: "1px",
                color: "#5f340e",
                marginBottom: "8px",
              }}
            >
              MEAL MENTORS MEMBERS
            </p>

            <h1
              style={{
                margin: "0 0 12px 0",
                fontSize: "42px",
                color: "#5f340e",
              }}
            >
              Log in
            </h1>

            <p
              style={{
                color: "#5f340e",
                fontSize: "16px",
                marginBottom: "30px",
              }}
            >
              Welcome back. Enter your details to access your recipes and tools.
            </p>

            <div
              style={{
                borderRadius: "18px",
                padding: "28px",
                backgroundColor: "#FFFDF7",
                border: "1px solid #E8D7B3",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  color: "#5f340e",
                }}
              >
                USERNAME
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "14px",
                  marginBottom: "24px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  boxSizing: "border-box",
                  backgroundColor: "#FFFDF7",
                  border: "1px solid #E6C68E",
                }}
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  color: "#5f340e",
                }}
              >
                PASSWORD
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "14px",
                  marginBottom: "18px",
                  backgroundColor: "#FFFDF7",
                  border: "1px solid #E6C68E",
                  borderRadius: "10px",
                  fontSize: "15px",
                  boxSizing: "border-box",
                }}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div
                style={{
                  fontSize: "14px",
                  color: "#5f340e",
                  marginBottom: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Forgot your password?
              </div>

              <button
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "linear-gradient(90deg, #674303, #664400)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={handleLogin}
              >
                LOGIN
              </button>

              <button
                style={{
                  width: "100%",
                  padding: "14px",
                  marginTop: "12px",
                  background: "transparent",
                  color: "#674303",
                  border: "2px solid #674303",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={handleRegister}
              >
                REGISTER
              </button>

              <p
                style={{
                  marginTop: "18px",
                  color: "#5f340e",
                  fontSize: "14px",
                }}
              >
                {message}
              </p>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              background: "linear-gradient(135deg, #F6E3A1, #EBCF7A)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "88px",
                fontWeight: "bold",
                marginBottom: "20px",
                letterSpacing: "2px",
                color: "#5f340e",
              }}
            >
              Meal Mentors
            </div>

            <p
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                marginBottom: "14px",
                color: "#5f340e",
              }}
            >
              Learn. Cook. Grow.
            </p>

            <p
              style={{
                fontSize: "18px",
                maxWidth: "400px",
                lineHeight: "1.6",
                color: "#5f340e",
              }}
            >
              Sign in to explore guided cooking paths, recipes, and tools designed
              to make learning in the kitchen easier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;