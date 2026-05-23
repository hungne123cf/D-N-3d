/*
  VisitorRepository.java
  - JPA repository for Visitor
*/

package com.portfolio.repository;

import com.portfolio.model.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitorRepository extends JpaRepository<Visitor, Long> {
  long count();
}

