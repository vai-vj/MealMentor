from itertools import count

from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import json
import os

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

    # Add LIMIT 8 to stop from loading all of the recipes
    cursor.execute("""
        SELECT id, name, ingredients, ingredients_raw, steps, servings, serving_size, tags
        FROM recipes
        ORDER BY RANDOM()
        LIMIT 8
    """)
    rows = cursor.fetchall()

    # cursor.execute("SELECT COUNT(*) FROM recipes")
    # count = cursor.fetchone()[0]
    # print("RECIPE COUNT:", count)

    conn.close()

    recipes = []

    for row in rows:
        ingredients = json.loads(row["ingredients"]) if row["ingredients"] else []
        steps = json.loads(row["steps"]) if row["steps"] else []
        tags = json.loads(row["tags"]) if row["tags"] else []

        recipes.append({
            "id": row["id"],
            "title": row["name"],
            "image": "https://placehold.co/300x220",
            "prepTime": "N/A",
            "cookTime": "N/A",
            "totalTime": "N/A",
            "ingredients": ingredients,
            "steps": steps,
            "servings": row["servings"],
            "servingSize": row["serving_size"],
            "tags": tags
        })
    #print("DB PATH /recipes:", os.path.abspath("meal_mentors.db"))
    
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
        "image": "https://placehold.co/300x220",
        "prepTime": "N/A",
        "cookTime": "N/A",
        "totalTime": "N/A",
        "ingredients": ingredients,
        "steps": steps,
        "servings": row["servings"],
        "servingSize": row["serving_size"],
        "tags": tags
    }
    #print("DB PATH /recipe-detail:", os.path.abspath("meal_mentors.db"))
    return jsonify(recipe), 200

@app.route('/track-recipe', methods=['POST'])
def track_recipe():
    data = request.get_json()
    user_id = data.get('user_id')
    recipe_id = data.get('recipe_id')

    if not user_id or not recipe_id:
        return jsonify({"status": "error", "message": "Missing user_id or recipe_id"}), 400

    conn = sqlite3.connect('meal_mentors.db')
    cursor = conn.cursor()
    try:
        # Inserts the saved recipe into the tracking table
        cursor.execute("INSERT INTO user_saved_recipes (user_id, recipe_id, status) VALUES (?, ?, ?)", 
                       (user_id, recipe_id, 'saved'))
        conn.commit()
        response = {"status": "success", "message": "Recipe saved to your account!"}
    except Exception as e:
        response = {"status": "error", "message": str(e)}
    finally:
        conn.close()

    return jsonify(response), 200

@app.route('/admin/recipes', methods=['GET'])
def get_all_recipes():
    conn = sqlite3.connect('meal_mentors.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, name, ingredients, ingredients_raw, steps, servings, serving_size, tags
        FROM recipes
        ORDER BY id ASC
        LIMIT 50    
    """)

    rows = cursor.fetchall()

    # print("ROWS:", rows) 
    # print("LEN ROWS:", len(rows))
    
    # cursor.execute("SELECT COUNT(*) FROM recipes")
    # count = cursor.fetchone()[0]
    # print("RECIPE COUNT:", count)

    conn.close()

    recipes = []

    for row in rows:
        ingredients = json.loads(row["ingredients"]) if row["ingredients"] else []
        steps = json.loads(row["steps"]) if row["steps"] else []
        tags = json.loads(row["tags"]) if row["tags"] else []

        recipes.append({
            "id": row["id"],
            "title": row["name"],
            "image": "https://placehold.co/300x220",
            "prepTime": "N/A",
            "cookTime": "N/A",
            "totalTime": "N/A",
            "ingredients": ingredients,
            "steps": steps,
            "servings": row["servings"],
            "servingSize": row["serving_size"],
            "tags": tags
        })

    # print("DB PATH /admin/recipes:", os.path.abspath("meal_mentors.db"))
    
    return jsonify(recipes), 200

if __name__ == '__main__':
    app.run(debug=True)