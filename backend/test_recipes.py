import sqlite3

conn = sqlite3.connect('meal_mentors.db')
cursor = conn.cursor()

dummy_recipes = [
    ('Spaghetti Bolognese', '15 min', '30 min'),
    ('Chicken Stir Fry', '10 min', '15 min'),
    ('Vegetarian Chili', '20 min', '45 min'),
    ('Pancakes', '10 min', '10 min')
]

# insert recipes
cursor.executemany("INSERT INTO recipes (title, prep_time, cook_time) VALUES (?, ?, ?)", dummy_recipes)

# track the first two recipes for user ID 1
tracked_data = [
    (1, 1, 'saved'),
    (1, 2, 'completed')
]
cursor.executemany("INSERT INTO user_saved_recipes (user_id, recipe_id, status) VALUES (?, ?, ?)", tracked_data)

conn.commit()
conn.close()

print("Dummy recipes and tracking data added.")