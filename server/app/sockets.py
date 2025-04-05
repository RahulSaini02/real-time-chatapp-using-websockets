from flask_socketio import SocketIO, send, emit, join_room, leave_room, ConnectionRefusedError
from app.models import ChatMessages
from app.database import db
import os
from dotenv import load_dotenv
from datetime import datetime
load_dotenv()

SOCKET_LOGGER = os.getenv("SOCKET_LOGGER") == "TRUE"
SOCKET_ENG_LOGGER = os.getenv("SOCKET_ENG_LOGGER") == "TRUE"

socketio = SocketIO(
        cors_allowed_origins="*", 
        logger=SOCKET_LOGGER, 
        engineio_logger=SOCKET_ENG_LOGGER
    )

@socketio.on('connect')
def handle_connect():
    print('Client Connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('join_room')
def handle_join_room(data):
    user_id = data.get("user_id")
    room = data.get('room')
    if user_id and room: 
        join_room(room)
        print(f"User({user_id}) has entered the room: {room}.")
    else:
        print("Invalid data received for joining room:", data)

@socketio.on('leave_room')
def handle_leave_room(data):
    room = data.get('room')
    leave_room(room)
    print(f"User has left the room: {room}.")

@socketio.on('send_message')
def handle_send_message(data):
    chat_id = data.get('chat_id')
    sender_id = data.get('sender_id')
    message_type = data.get('message_type')
    message_text = data.get('message_text')
    media_url = data.get('media_url')

    if chat_id and sender_id and message_type and message_text:
        new_message = ChatMessages(chat_id, sender_id, message_type, message_text, media_url)
        db.session.add(new_message)
        db.session.flush()

        formatted_message = {
            "message_id": str(new_message.message_id),
            "chat_id": str(new_message.chat_id),
            "sender_id": str(new_message.sender_id),
            "message_type": new_message.message_type,
            "message_text": new_message.message_text,
            "media_url": new_message.media_url,
            "message_timestamp": str(new_message.message_timestamp),
            "is_deleted": new_message.is_deleted,
            "status": "delivered"
        }

        db.session.commit()

        emit("receive_message", {"data": formatted_message}, room=str(chat_id))

