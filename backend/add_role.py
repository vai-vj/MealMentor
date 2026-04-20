import sqlite3

conn = sqlite3.connect('meal_mentors.db')
cursor = conn.cursor()

try:
    cursor.execute('ALTER TABLE users ADD COLUMN role TEXT DEFAULT "user"')
    cursor.execute('UPDATE users SET role = "admin" WHERE username = "test"')
    conn.commit()
    print("Role column added")
except sqlite3.OperationalError:
    print("The role column already exists or there is another issue.")

conn.close()