/*
  ContactService.java
  - Handles contact form persistence + optional email notification
*/

package com.portfolio.service;

import com.portfolio.model.Contact;
import com.portfolio.repository.ContactRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

  private final ContactRepository contactRepository;

  public ContactService(ContactRepository contactRepository) {
    this.contactRepository = contactRepository;
  }

  public Contact saveMessage(Contact contact) {
    // createdAt defaults handled by entity
    return contactRepository.save(contact);
  }
}

