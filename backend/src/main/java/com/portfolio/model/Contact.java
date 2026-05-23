/*
  Contact.java
  - JPA entity for contact messages
*/

package com.portfolio.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "contacts",
  indexes = {
    @Index(name = "idx_contacts_created_at", columnList = "createdAt")
  })
public class Contact {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Column(name = "name", nullable = false)
  private String name;

  @Email
  @NotBlank
  @Column(name = "email", nullable = false, length = 200)
  private String email;

  @NotBlank
  @Column(name = "subject", nullable = false, length = 255)
  private String subject;

  @Size(min = 10, max = 1000)
  @Column(name = "message", nullable = false, length = 2000)
  private String message;

  @Column(name = "createdAt", nullable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @Column(name = "isRead", nullable = false)
  private Boolean isRead = false;
}

