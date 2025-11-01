from backend.pacer_light import PacerLight

class CommandProcessor:
    def __init__(self, lights):
        self.lights = lights

    def parse_command(self, command_string):
        try:
            parts = command_string.split(',')
            if len(parts) != 5:
                return None, "Invalid command format: must have 5 parts"

            return {
                'id_mask': int(parts[0], 16),
                'brightness': int(parts[1]),
                'fade_in': int(parts[2]),
                'hold': int(parts[3]),
                'fade_out': int(parts[4]),
            }, None
        except ValueError as e:
            return None, f"Invalid command format: {e}"

    def dispatch_command(self, command):
        # 在这里实现指令分发逻辑
        pass