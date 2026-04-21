# 🍽️ Meal Mentors

🔗 GitHub Repository: https://github.com/vai-vj/MealMentor  

---

## 👥 Team Members
- Blake Stoltz  
- Aisha Yacoob  
- Mohammed Alfatlawi  
- Vaishnavi Vijayaraghavan  

---

## 🎯 Project Description

Meal Mentors is a web-based application designed to help users discover, manage, and view recipes. Users can register, log in, browse recipes, and view detailed information including ingredients and instructions.  

The system uses a React frontend, a Flask backend, and a SQLite database to provide a seamless and efficient user experience.

---

## 🚀 Features

### 👤 User Features
- User registration and login with unique credentials  
- Browse active recipes  
- View detailed recipe information (ingredients, instructions, serving size)  

### 🔐 Admin Features
- Admin login access  
- View all recipes in database  
- Manage recipes (Toggle recipe visibility) 

---

## 🏗️ System Architecture

The application follows a **client-server architecture**:

- **Frontend (React):** Handles user interface and interactions  
- **Backend (Flask):** Processes requests and manages application logic  
- **Database (SQLite):** Stores user and recipe data  

### System Flow
1. User interacts with the React frontend  
2. Frontend sends HTTP requests to backend API  
3. Backend processes requests and communicates with the database  
4. Data is returned and displayed to the user  

---

## 🛠️ Tech Stack

- **Frontend:** React (JavaScript, HTML, CSS)  
- **Backend:** Flask (Python)  
- **Database:** SQLite  
- **Communication:** REST API (HTTP requests)  

---

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/vai-vj/MealMentor.git
cd MealMentor
```
### 2. Backend Setup
Extract [Recipes_archive.zip](https://uflorida-my.sharepoint.com/:u:/g/personal/v_vijayaraghavan_ufl_edu/IQCiKSw5eddzSb9GgczHKwWBAZDAQoMLXJ4AbBMm4r5YLZA?e=obDOlH) in the backend folder
```bash
cd backend

# Optional: create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

python setup-db.py

pip install -r requirements.txt
python app.py
```
### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
