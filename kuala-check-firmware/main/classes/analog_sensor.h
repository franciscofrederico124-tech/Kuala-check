#pragma once

class analog_sensor
{
public:
    int pin_sensor;
    int value;

    void begin(int pin)
    {
        pin_sensor = pin;
        pinMode(pin_sensor, INPUT);
    }

    int read()
    {
        value = (int)(analogRead(pin_sensor));
        return value;
    }
    int read_digital()
    {
        value = (int)(digitalRead(pin_sensor));
        return value;
    }
    void print(String message)
    {
        printf("%s %i \n", message.c_str(), (int)(value));
    }
    void print_digital(String message)
    {
        printf("%s %i \n", message.c_str(), (int)(value));
    }
};
