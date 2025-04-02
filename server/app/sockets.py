from flask_socketio import SocketIO, send, emit, join_room, leave_room, ConnectionRefusedError
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
    room = data.get('room')
    sender = data.get('sender')
    message = data.get('message')
    print('received message: ', message)

    formatted_message = {
        "id": str(int(os.urandom(2).hex(), 16)),
        "text": message,
        "sender": sender,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "status": "sent"
    }

    emit("receive_message", {"message": formatted_message}, room=room)

