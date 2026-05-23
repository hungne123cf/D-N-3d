/*
  WebSocketConfig.java
  - Registers WebSocket endpoint /ws/visitor-count
*/

package com.portfolio.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

  private final VisitorCountWebSocketHandler visitorCountWebSocketHandler;

  public WebSocketConfig(VisitorCountWebSocketHandler visitorCountWebSocketHandler) {
    this.visitorCountWebSocketHandler = visitorCountWebSocketHandler;
  }

  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(visitorCountWebSocketHandler, "/ws/visitor-count")
      .setAllowedOrigins("*");
  }
}

