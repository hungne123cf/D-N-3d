/*
  DataInit.java
  - Optional fallback to verify application context if DB is not initialized
  - Does nothing if tables already exist.
*/

package com.portfolio.config;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInit {

  @Bean
  public ApplicationRunner noop() {
    return args -> {
      // Intentionally left blank.
    };
  }
}

