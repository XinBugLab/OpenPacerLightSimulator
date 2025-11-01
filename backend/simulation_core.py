from backend.pacer_light import PacerLight

class SimulationCore:
    def __init__(self, num_lights):
        self.lights = [PacerLight(1 << i) for i in range(num_lights)]

    def dispatch_command(self, command):
        for light in self.lights:
            light.execute_command(command)

    def update_simulation(self):
        for light in self.lights:
            light.update()

    def get_light_states(self):
        return [{'id': light.id, 'brightness': light.brightness, 'state': light.state} for light in self.lights]