from flask_socketio import SocketIO, emit

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on('connect')
def test_connect(auth):
    print('Client Connected')

@socketio.on('disconnect')
def test_disconnect(reason):
    print('Client disconnected, reason:', reason)