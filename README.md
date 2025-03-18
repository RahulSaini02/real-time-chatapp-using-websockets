# Full-Stack Chat Application

## Overview

This repository contains a full-stack chat application with a Next.js frontend and a Flask backend. The project is designed for real-time messaging with cloud-based services.

## Folder Structure

```bash
project-root/
│── client/       # Next.js frontend
│── server/       # Flask backend
│── .gitignore    # Git ignore file
│── README.md     # Documentation
└── package.json  # (Optional) If using workspace management
```

## Tech Stack

### **Frontend (Client - Next.js)**

- **Next.js** (React framework)
- **TypeScript**
- **Tailwind CSS**
- **Heroicons**
- **API requests with Axios**

### **Backend (Server - Flask)**

- **Flask** (Python framework)
- **Flask-RESTful** for APIs
- **DynamoDB** for database
- **WebSockets** (for real-time chat)
- **AWS Cognito** for authentication

### **Cloud Services**

- **AWS Lambda**
- **AWS API Gateway**
- **AWS DynamoDB**
- **AWS S3** (for media storage)
- **AWS SNS** (for notifications)

## Getting Started

### Clone the Repository

```bash
git clone git@github.com:RahulSaini02/real-time-chatapp-using-websockets.git
cd your-repo
```

### Setup the Client (Next.js)

```bash
cd client
npm install  # or yarn install
npm run dev  # Starts development server
```

- The frontend will run at <http://localhost:3000>

### Setup the Server (Flask)

```bash
cd ../server
python -m venv venv  # Create virtual environment
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

- The backend will run at <http://localhost:5000>

### API Endpoints

| Method   | Endpoint    | Description        |
|----------|-------------|--------------------|
| **POST** | `/login`    | User login         |
| **POST** | `/register` | User signup        |
| **GET**  | `/chats`    | Fetch user chats   |
| **POST** | `/message`  | Send a new message |

## 📌 Chat App - Database (PostgreSQL)

### 🚀 Getting Started

#### 1️⃣ Install PostgreSQL

If PostgreSQL is not installed, install it using:

- MacOS (Homebrew)

```bash
brew install postgresql
```

- Ubuntu/Debian

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

- Windows (Chocolatey)

```bash
choco install postgresql
```

After installation, start the PostgreSQL service:

```bash
sudo service postgresql start  # Ubuntu/Debian
brew services start postgresql  # MacOS
```

#### 2️⃣ Create a New Database

Log into PostgreSQL:

```bash
psql -U postgres
```

Then, create a database for the chat app

#### 4️⃣ Update Environment Variables

In the .env file, update:

```python
DATABASE_URL=postgresql://chat_user:securepassword@localhost/chat_app
```

#### 5️⃣ Apply Database Migrations

If using SQLAlchemy with Flask-Migrate, run:

```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```