void connect_to_wifi(String ssid, String password) {
  WiFi.begin(ssid.c_str(), password.c_str());
  printf("| > Conectando à rede %s \n", ssid.c_str());
  printf("| > \n");

  while (WiFi.status() != WL_CONNECTED) {
    printf(".");
    delay(1000);
  }

  printf("\n| > Conectado à rede %s \n", ssid.c_str());
  printf("| > IP na rede: ");
  Serial.println(WiFi.localIP());
  printf("\n");
}