# 📌 Chat App - Backend

This is the Flask backend for the real-time chat application. It provides the API, database connection, and WebSocket communication for the chat system.

## 🚀 Getting Started

### 1️⃣ Prerequisites

Ensure you have the following installed:

- Python 3.8+
- pip (Python package manager)
- virtualenv (Optional but recommended)

### 2️⃣ Setup Virtual Environment (Optional but Recommended)

```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows
```

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Configure Environment Variables

```python
FLASK_ENV=development
SECRET_KEY=your_secret_key
DATABASE_URL=sqlite:///chat.db
```

### 5️⃣ Run the Server

```bash
python run.py
```

The backend will be available at <http://localhost:5000>.

---

## 📂 Folder Structure

```git
server/
│── app/
│   ├── __init__.py       # Initializes Flask app
│   ├── config.py          # Configuration settings (database, secrets, etc.)
│   ├── database.py       # Database setup and connection
│   ├── models.py         # SQLAlchemy models (User, Message, etc.)
│   ├── routes.py         # REST API routes (login, messages, users)
│   ├── sockets.py        # WebSocket event handling (real-time chat)
│── migrations/           # Database migration files (if using Flask-Migrate)
│── tests/                # Unit tests for the backend
│── .env                  # Environment variables
│── .gitignore            # Ignored files for Git
│── requirements.txt      # Python dependencies
│── run.py                # Main entry point to start the Flask server
│── README.md             # Project documentation
```

---

## 📜 Folder Guidelines

### 1️⃣ app/ (Main Backend Code)

- __init__.py: Initializes Flask app, loads configurations.
- config.py: Stores environment settings and database configuration.
- database.py: Handles database connection and setup.
- models.py: Defines database models for users, messages, etc.
- routes.py: Defines REST API endpoints for authentication, messages, users.
- sockets.py: Handles WebSocket events for real-time communication.

### 2️⃣ tests/ (Backend Testing)

- Contains unit tests for API and WebSocket functionality.
- Run tests with:

```bash
pytest tests/
```

### 3️⃣ .env (Environment Variables)

- Stores sensitive information like database URL and secret keys.

### 4️⃣ requirements.txt (Dependencies)

- Lists required Python libraries.
- Install them using:

```bash
pip install -r requirements.txt
```

---

## 🔧 Naming Conventions

### ✅ Files & Folders:

- Use snake_case for Python files (database.py, sockets.py).
- Use PascalCase for SQLAlchemy models (User, Message).

### ✅ Variables & Functions:

- Use snake_case for functions (get_all_messages).
- Use UPPER_CASE for environment variables (DATABASE_URL).

---

## 🌐 API Endpoints

| Method   | Endpoint    | Description        |
|----------|-------------|--------------------|
| __POST__ | `/login`    | User login         |
| __POST__ | `/register` | User signup        |
| __GET__  | `/chats`    | Fetch user chats   |
| __POST__ | `/message`  | Send a new message |

---

## 📌 WebSocket Events

| Event Name      | Description                               |
|-----------------|-------------------------------------------|
| __connect__     | To establish connection to the websocket  |
| __message__     | To handle messages                        |
| __disconnect__  | To disconnect connection to the websocket |
