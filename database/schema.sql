-- schema.sql
-- MySQL schema for portfolio interactive journey

CREATE TABLE IF NOT EXISTS visitors (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  ip_address VARCHAR(64),
  user_agent VARCHAR(512),
  country VARCHAR(64),
  visit_time DATETIME NOT NULL,
  page_visited VARCHAR(256),
  INDEX idx_visitors_page_time (page_visited, visit_time),
  INDEX idx_visitors_visitTime (visit_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS contacts (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message VARCHAR(2000) NOT NULL,
  created_at DATETIME NOT NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  INDEX idx_contacts_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS projects (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  tech_stack TEXT,
  category VARCHAR(64),
  github_url VARCHAR(1024),
  demo_url VARCHAR(1024),
  image_url VARCHAR(1024),
  order_index INT,
  is_featured TINYINT(1) DEFAULT 0,
  INDEX idx_projects_category_order (category, order_index),
  INDEX idx_projects_featured (is_featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS skills (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  category VARCHAR(64),
  proficiency_level INT,
  icon_class VARCHAR(256),
  color_hex VARCHAR(32),
  INDEX idx_skills_category (category),
  INDEX idx_skills_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

