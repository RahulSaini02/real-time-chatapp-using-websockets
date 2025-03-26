import uuid
from app.database import db
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime

class User(db.Model):
    __tablename__ = "users"
    __table_args__ = {"schema": "chatapp"}  # Use schema "chatapp"

    user_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(256), nullable=False)
    email = db.Column(db.String(320), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)  # Hashed Password
    profile_pic = db.Column(db.String(1024), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, name, email, password, profile_pic=None):
        self.name = name
        self.email = email
        self.password = password  # Hashed before storing
        self.profile_pic = profile_pic