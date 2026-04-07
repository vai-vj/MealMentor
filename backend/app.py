from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

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
    
    # check if user exists in the database
    cursor.execute("SELECT * FROM users WHERE username = ? AND password_hash = ?", (username, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({"status": "success", "message": "Login successful!"}), 200
    else:
        return jsonify({"status": "error", "message": "Invalid username or password"}), 401

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
        cursor.execute("INSERT INTO users (username, password_hash) VALUES (?, ?)", (username, password))
        conn.commit()
        response = jsonify({"status": "success", "message": "Account created."})
        return response, 201
        
    except sqlite3.IntegrityError:
        # check if the username violates the UNIQUE constraint
        response = jsonify({"status": "error", "message": "Username already exists."})
        return response, 409
        
    finally:
        conn.close()


# Route to save or track a recipe
@app.route('/track-recipe', methods=['POST'])
def track_recipe():
    data = request.get_json()
    user_id = data.get('user_id')
    recipe_id = data.get('recipe_id')
    status = data.get('status', 'saved') # can be 'saved' 'in-progress' or 'completed'

    if not user_id or not recipe_id:
        return jsonify({"status": "error", "message": "Missing user_id or recipe_id"}), 400

    conn = sqlite3.connect('meal_mentors.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO user_saved_recipes (user_id, recipe_id, status) VALUES (?, ?, ?)", 
                   (user_id, recipe_id, status))
    conn.commit()
    conn.close()

    return jsonify({"status": "success", "message": "Recipe tracked!"}), 201

# Route to get a specific user's tracked recipes
@app.route('/my-recipes/<int:user_id>', methods=['GET'])
def get_tracked_recipes(user_id):
    conn = sqlite3.connect('meal_mentors.db')
    cursor = conn.cursor()
    
    query = '''
        SELECT recipes.title, recipes.prep_time, user_saved_recipes.status 
        FROM user_saved_recipes
        JOIN recipes ON user_saved_recipes.recipe_id = recipes.id
        WHERE user_saved_recipes.user_id = ?
    '''
    cursor.execute(query, (user_id,))
    results = cursor.fetchall()
    conn.close()

    # format the database output into JSON
    recipes = [{"title": row[0], "prep_time": row[1], "status": row[2]} for row in results]
    return jsonify({"status": "success", "data": recipes}), 200

if __name__ == '__main__':
    app.run(debug=True)