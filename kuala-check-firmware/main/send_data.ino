String send_data_system(String data_system) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    http.begin(apiBase + "/system/send_data");
    http.addHeader("Content-Type", "application/json");

    int http_code = http.POST(data_system);

    if (http_code > 0) {
      String response = http.getString();
      http.end();
      return response;
    } else {
      JsonDocument doc;
      doc["success"] = false;
      doc["content"]["message"] = "Erro na requisição! ";

      String response;
      serializeJson(doc, response);

      http.end();
      return response;
    }
  } else {
    JsonDocument doc;
    doc["success"] = false;
    doc["content"]["message"] = "Erro de conexão! ";

    String response;
    serializeJson(doc, response);

    WiFi.reconnect();

    return response;
  }
}
