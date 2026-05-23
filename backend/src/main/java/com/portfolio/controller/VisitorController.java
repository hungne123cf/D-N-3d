/*
  VisitorController.java
  - Endpoints for tracking visitors + statistics
*/

package com.portfolio.controller;

import com.portfolio.service.VisitorService;
import com.portfolio.websocket.VisitorCountWebSocketHandler;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/visitor")
public class VisitorController {

  private final VisitorService visitorService;
  private final VisitorCountWebSocketHandler websocketHandler;

  public VisitorController(VisitorService visitorService, VisitorCountWebSocketHandler websocketHandler) {
    this.visitorService = visitorService;
    this.websocketHandler = websocketHandler;
  }

  @GetMapping("/count")
  public Map<String, Long> getCount() {
    long count = visitorService.countVisitors();
    return Collections.singletonMap("count", count);
  }

  @PostMapping("/track")
  public ResponseEntity<?> trackVisitor(
    @RequestBody(required = false) Map<String, Object> body,
    HttpServletRequest request
  ) {

    String ip = request.getRemoteAddr();
    String ua = request.getHeader("User-Agent");

    String country = body != null && body.get("country") != null ? String.valueOf(body.get("country")) : null;
    String page = body != null && body.get("pageVisited") != null ? String.valueOf(body.get("pageVisited")) : request.getRequestURI();

    visitorService.trackVisitor(ip, ua, country, page);

    long count = visitorService.countVisitors();
    websocketHandler.broadcastCount(count);

    return ResponseEntity.ok().build();
  }

  @GetMapping("/stats")
  public Map<String, Object> stats() {
    // For now return a stub.
    // You can later implement daily aggregation query.
    return Map.of(
      "labels", new String[0],
      "counts", new int[0]
    );
  }
}

