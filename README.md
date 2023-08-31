# paana
A simple fullstack test app

## Backend
### Project Setup
Navigate to backend directory before running these commands
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```
### Starting the development server
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 8000
```

## Frontend
Navigate to frontend directory before running these commands
```bash
npm install
npm start 
```
This will get the development server running at localhost:3000. The react app automatically makes api calls to the backend server. Make sure the backend server is running
