# Next.js Todo Frontend

A beginner-friendly Todo List frontend built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**.

This project provides a web interface for the FastAPI Todo API, including user registration, login, JWT authentication, and Todo CRUD operations.

## Features

### Authentication

- User registration
- User login
- JWT access token authentication
- JWT refresh token support
- Protected routes
- Get current user
- Update current user
- Delete current user
- Logout

### Todo Management

- Create a Todo
- View your Todos
- View a single Todo
- Update a Todo
- Delete a Todo
- Mark Todos as completed
- Users can only access their own Todos

### Other Features

- Responsive UI
- TypeScript
- Next.js App Router
- API integration with FastAPI
- JWT authentication
- Loading states
- Error handling

## Technologies

- Next.js
- React
- TypeScript
- Tailwind CSS
- FastAPI
- REST API
- JWT
- Git
- GitHub

## Project Architecture

```text
┌──────────────────────────────┐
│       Next.js Frontend       │
│                              │
│  React + TypeScript          │
│  Tailwind CSS                │
│  Authentication UI           │
│  Todo CRUD UI                │
└──────────────┬───────────────┘
               │
               │ REST API + JWT
               ▼
┌──────────────────────────────┐
│       FastAPI Backend        │
│                              │
│  Authentication              │
│  JWT                         │
│  Todo CRUD                   │
│  SQLAlchemy                  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│           SQLite             │
│                              │
│  users                       │
│  todos                       │
└──────────────────────────────┘
```
### API
### Frontend
http://localhost:3000
## FastAPI Backend

## Production API:

https://fastapi-todo-api-p4ao.onrender.com

### FastAPI Swagger documentation:

https://fastapi-todo-api-p4ao.onrender.com/docs
Environment Variables

Create a .env.local file:

NEXT_PUBLIC_API_URL=https://fastapi-todo-api-p4ao.onrender.com

For local backend development:

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
API Endpoints
Method	Endpoint	Description
POST	/auth/users	Register a user
POST	/auth/jwt/create	Login
POST	/auth/jwt/refresh	Refresh JWT
POST	/auth/jwt/verify	Verify JWT
GET	/auth/users/me	Get current user
PATCH	/auth/users/me	Update current user
DELETE	/auth/users/me	Delete current user
GET	/todos	Get user's Todos
POST	/todos	Create a Todo
GET	/todos/{todo_id}	Get a Todo
PUT	/todos/{todo_id}	Update a Todo
DELETE	/todos/{todo_id}	Delete a Todo
Installation

### Clone the repository:

git clone <your-nextjs-repository-url>

Go to the project directory:

cd nextjs-todo

Install dependencies:

npm install

Create .env.local:

NEXT_PUBLIC_API_URL=https://fastapi-todo-api-p4ao.onrender.com
Run the Development Server
npm run dev

Open:

http://localhost:3000
## FastAPI Backend

### The frontend uses the following FastAPI backend:

https://fastapi-todo-api-p4ao.onrender.com

Swagger API documentation:

https://fastapi-todo-api-p4ao.onrender.com/docs
### Authentication Flow
```
Register
   │
   ▼
POST /auth/users
   │
   ▼
Login
   │
   ▼
POST /auth/jwt/create
   │
   ▼
Access Token + Refresh Token
   │
   ▼
Next.js Frontend
   │
   │ Authorization: Bearer <access_token>
   ▼
Protected Todo API

```
# Git

Initialize Git:

git init

Check status:

git status

Add files:

git add .

Commit:

git commit -m "Build Next.js Todo frontend"

Connect GitHub:

git remote add origin <your-github-repository-url>

Push:

git branch -M main
git push -u origin main

For future changes:

git add .
git commit -m "Update Todo frontend"
git push
.gitignore

Make sure .gitignore contains:

node_modules/
.next/
out/
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

Do not commit private environment variables or node_modules.

Production Build

Create a production build:

npm run build

Start the production server:

npm start
Learning Goals

This project is useful for learning:

## Next.js
React
TypeScript
App Router
Tailwind CSS
## REST APIs
JWT authentication
Protected routes
CRUD operations
API integration
Environment variables
## FastAPI + Next.js integration
Git
GitHub
### Full-Stack Architecture
```
┌───────────────────────┐
│     Next.js App       │
│   localhost:3000      │
└───────────┬───────────┘
            │
            │ REST API
            │ JWT
            ▼
┌───────────────────────┐
│    FastAPI Backend    │
│       Render          │
└───────────┬───────────┘
            │
            │ SQLAlchemy
            ▼
┌───────────────────────┐
│        SQLite         │
│     users / todos     │
└───────────────────────┘
```
Future Improvements
Dark mode
Todo search
Todo filtering
Todo categories
Due dates
Pagination
Automated tests
Better form validation
Improved JWT refresh handling
Docker
Production deployment
### License

# This project is for learning purposes.