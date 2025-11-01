from flask import Flask
from flask_socketio import SocketIO
from backend.simulation_core import SimulationCore
from backend.command_processor import CommandProcessor
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

simulation = SimulationCore(num_lights=8)
command_processor = CommandProcessor(simulation.lights)

def simulation_loop():
    while True:
        simulation.update_simulation()
        socketio.emit('update', simulation.get_light_states())
        time.sleep(0.01)  # 100 Hz update rate

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('command')
def handle_command(data):
    command_str = data.get('command')
    if not command_str:
        socketio.emit('command_error', 'Invalid command format')
        return

    command, error = command_processor.parse_command(command_str)
    if error:
        socketio.emit('command_error', error)
    else:
        simulation.dispatch_command(command)

if __name__ == '__main__':
    socketio.start_background_task(simulation_loop)
    socketio.run(app, debug=True)