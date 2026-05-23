-- seed.sql
-- Sample seed data for portfolio

-- Projects (12)
INSERT INTO projects (id, title, description, tech_stack, category, github_url, demo_url, image_url, order_index, is_featured) VALUES
(1, 'Galaxy Portfolio API', 'Backend for interactive 3D portfolio: projects/skills endpoints, visitor tracking, contact persistence.',
 '["Java","Spring Boot","JPA","WebSocket","Swagger"]', 'Full-Stack', 'https://github.com/example/galaxy-api', 'https://example.com/demo/galaxy-api', '', 1, 1),
(2, 'Skill Solar System', '3D skills visualization with tooltips, radar chart and animated category bars.',
 '["Three.js","WebGL","Chart.js","GSAP"]', 'Web', 'https://github.com/example/skill-solar-system', 'https://example.com/demo/skill-solar-system', '', 2, 0),
(3, 'Contact Rocket Mailer', 'Validated contact form: stores message to DB and triggers email workflow (configurable).',
 '["Spring Mail","Validation","REST","JPA"]', 'Java', 'https://github.com/example/contact-rocket', 'https://example.com/demo/contact-rocket', '', 3, 0),
(4, 'Realtime Visitor Counter', 'WebSocket push for visitor count updates without page reload.',
 '["WebSocket","STOMP","Spring"]', 'Java', 'https://github.com/example/realtime-visitors', 'https://example.com/demo/realtime-visitors', '', 4, 0),
(5, 'Microservices-ready Backend', 'Clean architecture for future microservices split, caching, and robust error handling.',
 '["Spring MVC","Cache","System Design"]', 'Full-Stack', 'https://github.com/example/microservices-ready', 'https://example.com/demo/microservices-ready', '', 5, 0),
(6, 'Swagger-driven Development', 'OpenAPI-first workflow for predictable frontend-backend integration.',
 '["springdoc","REST API","Swagger"]', 'Web', 'https://github.com/example/swagger-driven', 'https://example.com/demo/swagger-driven', '', 6, 0),
(7, 'Dockerized API Stack', 'Container-ready backend layout for local dev and deployment consistency.',
 '["Docker","Maven","MySQL"]', 'Full-Stack', 'https://github.com/example/dockerized-api', 'https://example.com/demo/dockerized-api', '', 7, 0),
(8, 'Database Modeling Toolkit', 'Schema design with indexes for high-read portfolio content & analytics.',
 '["MySQL","Indexing","SQL"]', 'Database', 'https://github.com/example/db-toolkit', 'https://example.com/demo/db-toolkit', '', 8, 0),
(9, 'Redis Caching Patterns', 'Caching strategy for API hot paths and reducing repeated DB loads.',
 '["Redis","Caching","Performance"]', 'Database', 'https://github.com/example/redis-caching', 'https://example.com/demo/redis-caching', '', 9, 0),
(10, 'API Observability', 'Actuator + health endpoints + operational readiness for production.',
 '["Actuator","Health","Monitoring"]', 'Full-Stack', 'https://github.com/example/observability', 'https://example.com/demo/observability', '', 10, 0),
(11, 'UML & Technical Writing', 'Documentation assets: UML diagrams and technical write-ups for maintainability.',
 '["UML","Agile","Technical Writing"]', 'Web', 'https://github.com/example/uml-docs', 'https://example.com/demo/uml-docs', '', 11, 0),
(12, 'Portfolio Admin Stats (stub)', 'Daily visitor stats endpoint + chart-ready payload (extendable).',
 '["Analytics","JPA","Charts"]', 'Database', 'https://github.com/example/admin-stats', 'https://example.com/demo/admin-stats', '', 12, 0);

-- Skills (24) 
INSERT INTO skills (id, name, category, proficiency_level, icon_class, color_hex) VALUES
(1, 'Java', 'Development', 92, 'icon-java', '#ff6a00'),
(2, 'Spring Boot', 'Development', 90, 'icon-spring', '#00f5ff'),
(3, 'Spring MVC', 'Development', 88, 'icon-mvc', '#00f5ff'),
(4, 'Hibernate / JPA', 'Development', 86, 'icon-jpa', '#2cff7d'),
(5, 'RESTful API Design', 'Development', 84, 'icon-rest', '#00f5ff'),
(6, 'Microservices Architecture', 'Development', 78, 'icon-micro', '#00f5ff'),
(7, 'JavaScript / TypeScript', 'Development', 82, 'icon-js', '#ffd166'),
(8, 'HTML5 / CSS3', 'Development', 88, 'icon-html', '#ffd166'),
(9, 'Git / GitHub', 'Development', 86, 'icon-git', '#00f5ff'),
(10, 'GSAP', 'Development', 76, 'icon-gsap', '#bf00ff'),
(11, 'Three.js / WebGL', 'Development', 80, 'icon-three', '#bf00ff'),

(12, 'MySQL', 'Database', 88, 'icon-mysql', '#2cff7d'),
(13, 'PostgreSQL', 'Database', 70, 'icon-postgres', '#2cff7d'),
(14, 'MongoDB', 'Database', 60, 'icon-mongo', '#2cff7d'),
(15, 'Redis', 'Database', 72, 'icon-redis', '#2cff7d'),
(16, 'Docker', 'Database', 74, 'icon-docker', '#00f5ff'),
(17, 'Kubernetes', 'Database', 55, 'icon-k8s', '#00f5ff'),
(18, 'Maven / Gradle', 'Database', 78, 'icon-build', '#bf00ff'),
(19, 'Postman / Swagger', 'Database', 86, 'icon-api', '#bf00ff'),

(20, 'System Design', 'Documentation', 84, 'icon-design', '#bf00ff'),
(21, 'UML Diagrams', 'Documentation', 78, 'icon-uml', '#bf00ff'),
(22, 'Agile / Scrum', 'Documentation', 76, 'icon-agile', '#bf00ff'),
(23, 'Technical Writing', 'Documentation', 80, 'icon-writing', '#bf00ff'),
(24, 'Debugging & Performance', 'Documentation', 82, 'icon-debug', '#bf00ff');

