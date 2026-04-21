import sqlite3
import csv
import json

def clean_list(value):
    return json.dumps([item.strip() for item in value.split(',') if item.strip()])

def setup_database():
    conn = sqlite3.connect('meal_mentors.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            current_level INTEGER DEFAULT 1,
            role TEXT DEFAULT "user"
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS recipes (
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
    
    try:
        with open('recipes_ingredients.csv', newline='', encoding='utf-8') as file:
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
    except FileNotFoundError:
        print("CSV file not found. Skipping recipe load.")

    cursor.execute("UPDATE recipes SET is_active = 0")
    cursor.execute('UPDATE users SET role = "admin" WHERE username = "test"')

    conn.commit()
    conn.close()
    print("Database setup complete.")

if __name__ == '__main__':
    setup_database()