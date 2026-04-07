import sqlite3

conn = sqlite3.connect('meal_mentors.db')
cursor = conn.cursor()

# clear out the old conflicting tables
cursor.execute('DROP TABLE IF EXISTS user_saved_recipes')
cursor.execute('DROP TABLE IF EXISTS recipes')

# create the new recipes table to match the CSV
cursor.execute('''
CREATE TABLE recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    ingredients TEXT,
    ingredients_raw TEXT,
    steps TEXT,
    servings TEXT,
    serving_size TEXT,
    tags TEXT
)
''')

# create the tracking table linking users to recipes
cursor.execute('''
CREATE TABLE IF NOT EXISTS user_saved_recipes (
    user_id INTEGER,
    recipe_id INTEGER,
    status TEXT, 
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(recipe_id) REFERENCES recipes(id)
)
''')

conn.commit()
conn.close()

print("Tracking tables created successfully.")