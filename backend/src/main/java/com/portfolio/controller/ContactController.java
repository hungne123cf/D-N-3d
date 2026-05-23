/*
  ContactController.java
  - POST /api/contact to receive contact messages
*/

package com.portfolio.controller;

import com.portfolio.model.Contact;
import com.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ContactController {

  private final ContactService contactService;

  public ContactController(ContactService contactService) {
    this.contactService = contactService;
  }

  @PostMapping("/contact")
  public ResponseEntity<?> submitContact(@Valid @RequestBody Contact contact) {
    Contact saved = contactService.saveMessage(contact);
    return ResponseEntity.ok(Map.of("id", saved.getId()));
  }
}

