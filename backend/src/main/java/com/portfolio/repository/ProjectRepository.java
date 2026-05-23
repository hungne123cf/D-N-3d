/*
  ProjectRepository.java
  - JPA repository for Project
*/

package com.portfolio.repository;

import com.portfolio.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
  List<Project> findByCategoryOrderByOrderIndexAsc(String category);
}

