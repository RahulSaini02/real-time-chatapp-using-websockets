from app import create_app
from app.config import Config
from app.routes import routes
from app.database import db

import os
from dotenv import load_dotenv

load_dotenv()

app = create_app()

app.config.from_object(Config)
db.init_app(app)
app.register_blueprint(routes)

debug = os.getenv("FLASK_DEBUG") == "TRUE"  # Convert string to boolean
port = int(os.getenv("FLASK_PORT", 8080))  # Ensure port is an integer

if __name__ == "__main__":
    app.run(debug=debug, port=port)
