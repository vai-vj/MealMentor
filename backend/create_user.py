import sqlite3

conn = sqlite3.connect('meal_mentors.db')
cursor = conn.cursor()

# insert a test user to test authentication
cursor.execute("INSERT INTO users (username, password_hash) VALUES ('test', 'test')")

conn.commit()
conn.close()

print("Test user created!")