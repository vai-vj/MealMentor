import sqlite3
import csv
import json
import os

def clean_list(value):
    return json.dumps([item.strip() for item in value.split(',') if item.strip()])

def setup_database():
    conn = sqlite3.connect('meal_mentors.db')
    cursor = conn.cursor()
    
    cursor.execute('DROP TABLE IF EXISTS users')
    cursor.execute('DROP TABLE IF EXISTS recipes')
    
    cursor.execute('''
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            current_level INTEGER DEFAULT 1,
            role TEXT DEFAULT "user"
        )
    ''')

    cursor.execute('''
        CREATE TABLE recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            ingredients TEXT,
            ingredients_raw TEXT,
            steps TEXT,
            servings INTEGER,
            serving_size INTEGER,
            tags TEXT,
            is_active INTEGER DEFAULT 1
        )
    ''')
    
    # Make sure this matches your actual CSV file name
    csv_filename = 'recipes_ingredients.csv' 
    
    if os.path.exists(csv_filename):
        print("CSV found. Loading recipes.")
        with open(csv_filename, newline='', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                name = row.get('name')
                ingredients = clean_list(row.get('ingredients', ''))
                ingredients_raw = clean_list(row.get('ingredients_raw', ''))
                steps = clean_list(row.get('steps', ''))
                servings = row.get('servings')
                serving_size = row.get('serving_size')
                tags = clean_list(row.get('tags', ''))
                
                cursor.execute("""
                    INSERT INTO recipes (name, ingredients, ingredients_raw, steps, servings, serving_size, tags) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                """, (name, ingredients, ingredients_raw, steps, servings, serving_size, tags))
        print("Recipes loaded successfully.")
    else:
        print(f"ERROR: Could not find {csv_filename} in this folder. Your database is empty!")

    # Create a default admin user
    cursor.execute('INSERT OR IGNORE INTO users (username, password, role) VALUES ("test", "test", "admin")')

    conn.commit()
    conn.close()
    print("Database setup complete.")

if __name__ == '__main__':
    setup_database()