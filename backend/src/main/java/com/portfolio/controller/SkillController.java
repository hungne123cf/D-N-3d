/*
  SkillController.java
  - GET /api/skills
*/

package com.portfolio.controller;

import com.portfolio.model.Skill;
import com.portfolio.service.SkillService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SkillController {

  private final SkillService skillService;

  public SkillController(SkillService skillService) {
    this.skillService = skillService;
  }

  @GetMapping("/skills")
  public List<Skill> listSkills() {
    return skillService.listSkills();
  }
}

