/*
  ProjectController.java
  - GET /api/projects and GET /api/projects/{id}
*/

package com.portfolio.controller;

import com.portfolio.model.Project;
import com.portfolio.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProjectController {

  private final ProjectService projectService;

  public ProjectController(ProjectService projectService) {
    this.projectService = projectService;
  }

  @GetMapping("/projects")
  public List<Project> listProjects(@RequestParam(name = "category", required = false) String category) {
    return projectService.listProjects(category);
  }

  @GetMapping("/projects/{id}")
  public ResponseEntity<Project> getProject(@PathVariable Long id) {
    return projectService.getProjectById(id)
      .map(ResponseEntity::ok)
      .orElseGet(() -> ResponseEntity.notFound().build());
  }
}

