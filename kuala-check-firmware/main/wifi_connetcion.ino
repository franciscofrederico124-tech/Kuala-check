#include <Arduino.h>
#include <WiFi.h>
void connect_to_wifi(String ssid, String password)
{

  WiFi.begin(ssid.c_str(), password.c_str());
  Serial.printf("| > Conectando à rede %s \n", ssid.c_str());
  Serial.printf("| > \n");
  
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.printf(".");
    delay(1000);
  }

  Serial.printf("\n| > Conectado à rede %s \n", ssid.c_str());
  Serial.print("| > IP na rede: ");
  Serial.println(WiFi.localIP());
}
