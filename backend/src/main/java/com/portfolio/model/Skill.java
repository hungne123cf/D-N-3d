/*
  Skill.java
  - JPA entity for skills used by the Skills section
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
@Table(name = "skills",
  indexes = {
    @Index(name = "idx_skills_category", columnList = "category"),
    @Index(name = "idx_skills_name", columnList = "name")
  })
public class Skill {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name", nullable = false, length = 128)
  private String name;

  @Column(name = "category", length = 64)
  private String category;

  @Column(name = "proficiencyLevel")
  private Integer proficiencyLevel;

  @Column(name = "iconClass", length = 256)
  private String iconClass;

  @Column(name = "colorHex", length = 32)
  private String colorHex;
}

