/*
  SkillRepository.java
  - JPA repository for Skill
*/

package com.portfolio.repository;

import com.portfolio.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {
  List<Skill> findByCategoryOrderByProficiencyLevelDesc(String category);
}

