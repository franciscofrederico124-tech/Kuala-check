#include <DHT.h>
#include <Arduino.h>
#include <WiFi.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include "./classes/analog_sensor.h"
#include "./classes/actor.h"
#include <math.h>

void connect_to_wifi(String ssid, String password);

String ssid = "itel A100C";
String password = "francisco_tech_2026";

#define dht_pin 4
#define dht_type DHT11

DHT dht(dht_pin, dht_type);
LiquidCrystal_I2C display(0x27, 20, 4);

actor led_red;
actor led_yellow;
actor led_green;
actor rele;

analog_sensor mq2;
analog_sensor soil_sensor;
analog_sensor rain_sensor;

void setup()
{

    Serial.begin(115200);
    display.init();
    display.backlight();
    display.clear();
    display.setCursor(0, 0);
    display.print(" Sistama inciando... ");

    mq2.begin(15);
    soil_sensor.begin(16);
    rain_sensor.begin(17);

    led_red.begin(5);
    led_yellow.begin(18);
    led_green.begin(19);
    rele.begin(2);

    dht.begin();
}

void loop()
{
    const int air = mq2.read();
    const int soil_humidity = soil_sensor.read_digital();
    const int rain = rain_sensor.read_digital();
    const int air_humidity = (int)(round(dht.readHumidity()));
    const int air_temperature = (int)(round(dht.readTemperature()));

    printf("\n|----------------------------------------------------|\n");
    mq2.print("| > Qualidade do ar:");
    soil_sensor.print_digital("| > Humidade do solo: ");
    rain_sensor.print_digital("| > Chuva: ");

    printf("| > Humidade do ar: %i \n", air_humidity);
    printf("| > Temperatura do ar %i \n", air_temperature);
    printf("|----------------------------------------------------|\n");

    display.setCursor(0, 0);
    display.print("Hum: ");
    display.print(air_humidity);
    display.print("%          ");

    display.setCursor(0, 1);
    display.print("Temp: ");
    display.print(air_temperature);
    display.print("C");

    led_red.high();

    delay(2000);
}