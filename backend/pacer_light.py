import time

class PacerLight:
    def __init__(self, id):
        self.id = id
        self.brightness = 0
        self.state = 'IDLE'
        self.target_brightness = 0
        self.fade_in_duration = 0
        self.hold_duration = 0
        self.fade_out_duration = 0
        self.state_start_time = 0

    def execute_command(self, command):
        if (command['id_mask'] & self.id) == self.id:
            self.target_brightness = command['brightness']
            self.fade_in_duration = command['fade_in'] / 1000  # us to ms
            self.hold_duration = command['hold']
            self.fade_out_duration = command['fade_out']
            self.state = 'FADING_IN'
            self.state_start_time = time.time()

    def update(self):
        elapsed_time = (time.time() - self.state_start_time) * 1000  # in ms

        if self.state == 'FADING_IN':
            if elapsed_time >= self.fade_in_duration:
                self.brightness = self.target_brightness
                self.state = 'HOLDING'
                self.state_start_time = time.time()
            else:
                self.brightness = int((elapsed_time / self.fade_in_duration) * self.target_brightness)
        
        elif self.state == 'HOLDING':
            if elapsed_time >= self.hold_duration:
                self.state = 'FADING_OUT'
                self.state_start_time = time.time()

        elif self.state == 'FADING_OUT':
            if elapsed_time >= self.fade_out_duration:
                self.brightness = 0
                self.state = 'IDLE'
            else:
                self.brightness = int(self.target_brightness * (1 - (elapsed_time / self.fade_out_duration)))