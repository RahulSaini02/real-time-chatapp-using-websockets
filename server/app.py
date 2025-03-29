from app import create_app
from app.config import Config

from app.routes.auth.routes import auth_routes
from app.routes.chat.routes import chat_routes
from app.routes.user.routes import user_routes

from app.database import db

import os
from dotenv import load_dotenv

load_dotenv()

app = create_app()

app.config.from_object(Config)
db.init_app(app)

app.register_blueprint(auth_routes)
app.register_blueprint(chat_routes)
app.register_blueprint(user_routes)

debug = os.getenv("FLASK_DEBUG") == "TRUE"  # Convert string to boolean
port = int(os.getenv("FLASK_PORT", 8080))  # Ensure port is an integer

if __name__ == "__main__":
    app.run(debug=debug, port=port)
