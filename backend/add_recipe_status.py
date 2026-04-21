import sqlite3

conn = sqlite3.connect('meal_mentors.db')
cursor = conn.cursor()

try:
    #cursor.execute('ALTER TABLE recipes ADD COLUMN is_active INTEGER DEFAULT 1')

    cursor.execute("UPDATE recipes SET is_active = 0")

    conn.commit()
    print("Recipe status column added")
except sqlite3.OperationalError:
    print("The status column already exists or there is another issue.")

conn.close()