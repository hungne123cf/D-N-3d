/*
  Visitor.java
  - JPA entity for storing visitor tracking events
*/

package com.portfolio.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "visitors",
  indexes = {
    @Index(name = "idx_visitors_page_time", columnList = "pageVisited,visitTime"),
    @Index(name = "idx_visitors_visitTime", columnList = "visitTime")
  })
public class Visitor {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "ipAddress", length = 64)
  private String ipAddress;

  @Column(name = "userAgent", length = 512)
  private String userAgent;

  @Column(name = "country", length = 64)
  private String country;

  @Column(name = "visitTime", nullable = false)
  private LocalDateTime visitTime;

  @Column(name = "pageVisited", length = 256)
  private String pageVisited;
}

