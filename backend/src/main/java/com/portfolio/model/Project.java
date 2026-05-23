/*
  Project.java
  - JPA entity for portfolio projects
*/

package com.portfolio.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "projects",
  indexes = {
    @Index(name = "idx_projects_category_order", columnList = "category,orderIndex"),
    @Index(name = "idx_projects_featured", columnList = "isFeatured")
  })
public class Project {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "title", nullable = false, length = 255)
  private String title;

  @Column(name = "description", columnDefinition = "TEXT")
  private String description;

  // JSON string (kept as string for simplicity)
  @Column(name = "techStack", columnDefinition = "TEXT")
  private String techStack;

  @Column(name = "category", length = 64)
  private String category;

  @Column(name = "githubUrl", length = 1024)
  private String githubUrl;

  @Column(name = "demoUrl", length = 1024)
  private String demoUrl;

  @Column(name = "imageUrl", length = 1024)
  private String imageUrl;

  @Column(name = "orderIndex")
  private Integer orderIndex;

  @Column(name = "isFeatured")
  private Boolean isFeatured;
}

