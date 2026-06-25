#include <Arduino.h>
#include <DHT.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include "./classes/analog_sensor.h"
#include "./classes/actor.h"
#include <math.h>
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"

#define dht_pin 4
#define dht_type DHT11

String apiBase = "http://192.168.8.173:4001";
String ssid = "Assembly";
String password = "Orieljoelcapitadasilva";

DHT dht(dht_pin, dht_type);
LiquidCrystal_I2C display(0x27, 20, 4);

actor led_red;
actor led_yellow;
actor led_green;
actor water_pump;

analog_sensor mq2;
analog_sensor soil_sensor;
analog_sensor rain_sensor;

int command;
String server_data;

String send_data_system(String data_system);
void connect_to_wifi(String ssid, String password);

void setup() {
  analogReadResolution(10);
  Serial.begin(115200);
  connect_to_wifi(ssid, password);

  display.init();
  display.backlight();
  display.clear();
  display.setCursor(0, 0);
  display.print(" Sistema iniciando... ");

  mq2.begin(35);
  soil_sensor.begin(15);
  rain_sensor.begin(23);

  led_red.begin(5);
  led_yellow.begin(18);
  led_green.begin(19);
  water_pump.begin(2);

  dht.begin();
}

void loop() {

  printf(" |  > AIR: %", (int)(analogRead(23)));
  const int air = mq2.read();
  const int soil_humidity = soil_sensor.read_digital();
  const int rain = rain_sensor.read_digital();
  const int air_humidity = (int)(round(dht.readHumidity()));
  const int air_temperature = (int)(round(dht.readTemperature()));

  JsonDocument data;

  data["system"]["Firmware"] = "Esp32 dev module";
  data["system"]["software_language"] = "C/C++";
  data["system"]["version"] = "1.0.0";

  data["data"]["sensors"]["air_sensor"] = air;
  data["data"]["sensors"]["rain_sensor"] = rain;
  data["data"]["sensors"]["soil_humidity"] = soil_humidity;
  data["data"]["sensors"]["air_humidity"] = air_humidity;
  data["data"]["sensors"]["air_temperature"] = air_temperature;

  data["data"]["actors"]["water_pump"] = command;
  String data_system;
  serializeJsonPretty(data, data_system);

  printf("\n|----------------------------------------------------|\n");
  Serial.printf("| %s \n", data_system.c_str());
  printf("|----------------------------------------------------|\n");

  server_data = send_data_system(data_system);

  JsonDocument response;

  printf("\n|----------------------------------------------------|\n");
  Serial.printf("| %s \n", server_data.c_str());
  printf("|----------------------------------------------------|\n");

  deserializeJson(response, server_data);

  if (response["success"] == true) {
    command = response["content"]["actors"]["water_pump"];
    printf("| > Camando: %i", command);
    water_pump.get_digital_command(command);

  }

  else {
    water_pump.low();
    printf("| > Erro ao enviar dados! \n");
  }

  display.setCursor(0, 0);
  display.print("Hum: ");
  display.print(air_humidity);
  display.print("%          ");

  display.setCursor(0, 1);
  display.print("Temp: ");
  display.print(air_temperature);
  display.print("C");

  led_red.high();

  delay(10);
}