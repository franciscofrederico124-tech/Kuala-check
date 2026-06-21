#pragma once
#include <math.h>

class actor {
public:
  int actor_pin;

  void begin(int pin) {
    actor_pin = pin;
    pinMode(actor_pin, OUTPUT);
    digitalWrite(actor_pin, LOW);
  }

  void high() {
    digitalWrite(actor_pin, HIGH);
  }
  void low() {
    digitalWrite(actor_pin, LOW);
  }
  void get_digital_command(int value) {
    digitalWrite(actor_pin, value);
  }
  void analog_high(float value) {
    analogWrite(actor_pin, (int)(round(value)));
  }
};