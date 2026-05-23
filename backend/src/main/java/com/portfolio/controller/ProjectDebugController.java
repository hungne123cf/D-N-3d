/*
  ProjectDebugController.java
  - Temporary debug helper endpoints (can be removed later)
*/

package com.portfolio.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/debug")
public class ProjectDebugController {

  @GetMapping("/ping")
  public Map<String, String> ping() {
    return Map.of("pong", "ok");
  }
}

