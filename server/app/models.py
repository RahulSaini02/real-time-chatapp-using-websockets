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

class Chats(db.Model):
    __tablename__ = "chats"
    __table_args__ = {"schema": "chatapp"}

    chat_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    is_group = db.Column(db.Boolean, default=False)
    group_name = db.Column(db.String(256), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, is_group, group_name=None):
        self.is_group = is_group
        self.group_name = group_name

class ChatParticipants(db.Model):
    __tablename__ = "chat_participants"
    __table_args__ = {"schema": "chatapp"}

    chat_id = db.Column(UUID, db.ForeignKey("chatapp.chats.chat_id", ondelete="CASCADE"), primary_key=True, nullable=False)
    user_id = db.Column(UUID, db.ForeignKey("chatapp.users.user_id", ondelete="CASCADE"), primary_key=True, nullable=False)
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, chat_id, user_id):
        self.chat_id = chat_id
        self.user_id = user_id
    

