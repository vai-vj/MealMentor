from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import json

app = Flask(__name__)
CORS(app) 

@app.route('/', methods=['GET'])
def home():
    return jsonify({"status": "Meal Mentors API is running"})

# New Login Endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = sqlite3.connect('meal_mentors.db')
    cursor = conn.cursor()
    # Add role to the SELECT statement
    cursor.execute("SELECT id, password, role FROM users WHERE username = ?", (username,))
    user = cursor.fetchone()
    conn.close()

    if user and user[1] == password:
        return jsonify({
            "status": "success", 
            "message": "Login successful",
            "user_id": user[0],
            "role": user[2] # Send role back to React
        }), 200
    else:
        return jsonify({"status": "error", "message": "Invalid credentials"}), 401

# New Registration Endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"status": "error", "message": "Username and password are required"}), 400

    conn = sqlite3.connect('meal_mentors.db')
    cursor = conn.cursor()
    
    try:
        # insert the new user into the database
        cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
        conn.commit()
        response = jsonify({"status": "success", "message": "Account created."})
        return response, 201
        
    except sqlite3.IntegrityError:
        # check if the username violates the UNIQUE constraint
        response = jsonify({"status": "error", "message": "Username already exists."})
        return response, 409
        
    finally:
        conn.close()

@app.route('/recipes', methods=['GET'])
def get_recipes():
    conn = sqlite3.connect('meal_mentors.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, name, ingredients, ingredients_raw, steps, servings, serving_size, tags
        FROM recipes
        ORDER BY id
    """)
    rows = cursor.fetchall()
    conn.close()

    recipes = []

    for row in rows:
        ingredients = json.loads(row["ingredients"]) if row["ingredients"] else []
        steps = json.loads(row["steps"]) if row["steps"] else []
        tags = json.loads(row["tags"]) if row["tags"] else []

        recipes.append({
            "id": row["id"],
            "title": row["name"],
            "image": "https://via.placeholder.com/300x220",
            "prepTime": "N/A",
            "cookTime": "N/A",
            "totalTime": "N/A",
            "ingredients": ingredients,
            "steps": steps,
            "servings": row["servings"],
            "servingSize": row["serving_size"],
            "tags": tags
        })

    return jsonify(recipes), 200

@app.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe_by_id(recipe_id):
    conn = sqlite3.connect('meal_mentors.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, name, ingredients, ingredients_raw, steps, servings, serving_size, tags
        FROM recipes
        WHERE id = ?
    """, (recipe_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return jsonify({"status": "error", "message": "Recipe not found"}), 404

    ingredients = json.loads(row["ingredients"]) if row["ingredients"] else []
    steps = json.loads(row["steps"]) if row["steps"] else []
    tags = json.loads(row["tags"]) if row["tags"] else []

    recipe = {
        "id": row["id"],
        "title": row["name"],
        "image": "https://via.placeholder.com/300x220",
        "prepTime": "N/A",
        "cookTime": "N/A",
        "totalTime": "N/A",
        "ingredients": ingredients,
        "steps": steps,
        "servings": row["servings"],
        "servingSize": row["serving_size"],
        "tags": tags
    }

    return jsonify(recipe), 200

if __name__ == '__main__':
    app.run(debug=True)