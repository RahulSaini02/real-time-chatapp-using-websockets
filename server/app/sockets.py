from flask_socketio import SocketIO, send, emit, join_room, leave_room, ConnectionRefusedError
import os
from dotenv import load_dotenv
load_dotenv()

SOCKET_LOGGER = os.getenv("SOCKET_LOGGER") == "TRUE"
SOCKET_ENG_LOGGER = os.getenv("SOCKET_ENG_LOGGER") == "TRUE"

socketio = SocketIO(
        cors_allowed_origins="*", 
        logger=SOCKET_LOGGER, 
        engineio_logger=SOCKET_ENG_LOGGER
    )

@socketio.on('connect')
def connect(auth):
    print('Client Connected')

# @socketio.on('connect')
# def connect():
#     if not self.authenticate(request.args):
#         raise ConnectionRefusedError('unauthorized!')

@socketio.on('disconnect')
def test_disconnect(reason):
    print('Client disconnected, reason:', reason)

# @socketio.on('message')
# def handle_message(message):
#     send(message)

@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    print((username + ' has entered the room.'))
    send(username + ' has entered the room.', to=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)
