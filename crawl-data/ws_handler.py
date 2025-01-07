import socketio

# Create a Socket.IO server with ASGI
sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins="*")

# Define the event handlers
from status_handler import StatusHandler

# Initialize the status handler
status_handler = StatusHandler()


@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")
    await sio.emit("broadcast", "Connected", to=sid)


@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")


@sio.event
async def current_status(sid):
    current_status = status_handler.get_status()
    print(f"Sending current_status to {sid}: {current_status}")
    await sio.emit("current_status", current_status, to=sid)


# Create the ASGI application for Socket.IO
socket_app = socketio.ASGIApp(sio, socketio_path="/crawl/socket.io")
