/*
  SecurityConfig.java
  - Permit all for frontend and swagger
  - Keeps endpoints secured only if you later add authentication
*/

package com.portfolio.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import org.springframework.security.config.http.SessionCreationPolicy;

import static org.springframework.security.config.annotation.web.builders.HttpSecurity.*;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable())
      .cors(withDefaults())
      .authorizeHttpRequests(auth -> auth
        .requestMatchers(
          new AntPathRequestMatcher("/swagger-ui.html"),
          new AntPathRequestMatcher("/swagger-ui/**"),
          new AntPathRequestMatcher("/v3/api-docs/**"),
          new AntPathRequestMatcher("/actuator/**"),
          new AntPathRequestMatcher("/ws/**"),
          new AntPathRequestMatcher("/api/health"),
          new AntPathRequestMatcher("/api/**")
        ).permitAll()
        .anyRequest().permitAll()
      )
      .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    return http.build();
  }
}

