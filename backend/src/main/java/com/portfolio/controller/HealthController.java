/*
  HealthController.java
  - GET /api/health
*/

package com.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthController {

  @GetMapping("/health")
  public ResponseEntity<?> health() {
    return ResponseEntity.ok().body(java.util.Map.of(
      "status", "UP"
    ));
  }
}

