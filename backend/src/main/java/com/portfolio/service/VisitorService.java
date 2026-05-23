/*
  VisitorService.java
  - Handles visitor tracking logic
*/

package com.portfolio.service;

import com.portfolio.model.Visitor;
import com.portfolio.repository.VisitorRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class VisitorService {

  private final VisitorRepository visitorRepository;

  public VisitorService(VisitorRepository visitorRepository) {
    this.visitorRepository = visitorRepository;
  }

  public long countVisitors() {
    return visitorRepository.count();
  }

  public void trackVisitor(String ipAddress, String userAgent, String country, String pageVisited) {
    Visitor v = new Visitor();
    v.setIpAddress(ipAddress);
    v.setUserAgent(userAgent);
    v.setCountry(country);
    v.setPageVisited(pageVisited);
    v.setVisitTime(LocalDateTime.now());
    visitorRepository.save(v);
  }
}

