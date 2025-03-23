from app import create_app
from app.config import Config
from app.routes import router
from app.database import db

from dotenv import load_dotenv

load_dotenv()

app = create_app()

app.config.from_object(Config)
app.register_blueprint(router)
db.init_app(app)

debug=os.getenv("FLASK_DEBUG")
port=os.getenv("FLASK_PORT")

if __name__ == "__main__":
  app.run(debug=debug, port=port)
