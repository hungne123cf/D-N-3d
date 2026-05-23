/*
  VisitorCountWebSocketHandler.java
  - WebSocket handler that maintains connections for realtime visitor count
*/

package com.portfolio.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component
public class VisitorCountWebSocketHandler extends TextWebSocketHandler {

  private final Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<>());
  private final ObjectMapper mapper = new ObjectMapper();

  @Override
  public void afterConnectionEstablished(WebSocketSession session) {
    sessions.add(session);
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
    sessions.remove(session);
  }

  public void broadcastCount(long count) {
    var payload = Collections.singletonMap("count", count);
    String msg;
    try {
      msg = mapper.writeValueAsString(payload);
    } catch (Exception e) {
      return;
    }

    synchronized (sessions) {
      for (WebSocketSession s : sessions) {
        if (!s.isOpen()) continue;
        try {
          s.sendMessage(new TextMessage(msg));
        } catch (IOException ignored) {
          // ignore failed session
        }
      }
    }
  }
}

