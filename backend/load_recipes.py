import sqlite3
import csv
import json

def clean_list(value):
    return json.dumps([item.strip() for item in value.split(',') if item.strip()])


conn = sqlite3.connect('meal_mentors.db')
cursor = conn.cursor()

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

conn.commit()
conn.close()

print("Recipes loaded into the database!")