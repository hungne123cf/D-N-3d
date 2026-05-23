/*
  ProjectService.java
  - Business logic for projects + mapping
*/

package com.portfolio.service;

import com.portfolio.model.Project;
import com.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

  private final ProjectRepository projectRepository;

  public ProjectService(ProjectRepository projectRepository) {
    this.projectRepository = projectRepository;
  }

  public List<Project> listProjects(String category) {
    if (category == null || category.isBlank() || category.equalsIgnoreCase("All")) {
      return projectRepository.findAll();
    }
    return projectRepository.findByCategoryOrderByOrderIndexAsc(category);
  }

  public Optional<Project> getProjectById(Long id) {
    return projectRepository.findById(id);
  }
}

