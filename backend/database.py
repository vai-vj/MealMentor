import sqlite3

def init_db():
    conn = sqlite3.connect('meal_mentors.db')
    cursor = conn.cursor()
    
    # create the users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            current_level INTEGER DEFAULT 1
        )
    ''')

    #create the recipes table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            ingredients TEXT,
            ingredients_raw TEXT,
            steps TEXT,
            servings INTEGER,
            serving_size INTEGER,
            tags TEXT
        )
    ''')
    
    conn.commit()
    conn.close()
    print("Database initialized.")

if __name__ == '__main__':
    init_db()