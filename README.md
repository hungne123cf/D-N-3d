# D-N-3d — Portfolio Interactive Journey

Interactive 3D portfolio for **Trương Hùng** (Frontend: vanilla HTML/CSS/JS + Three.js; Backend: Spring Boot; DB: MySQL).

---

## 1) Prerequisites
- Java 17
- Maven
- MySQL 8+
- (Optional) VSCode extensions: Live Server

---

## 2) Database setup (MySQL)
1. Create database:
   - `portfolio_db`
2. Import SQL files:
   - `database/schema.sql`
   - `database/seed.sql`

Example (run in MySQL CLI):
```sql
SOURCE d:\dự án 3d\D-N-3d\database\schema.sql;
SOURCE d:\dự án 3d\D-N-3d\database\seed.sql;
```

---

## 3) Backend setup (Spring Boot)
1. Open `backend/pom.xml` in IDE or run from terminal:
```bat
cd "d:\dự án 3d\D-N-3d\backend"
mvn -DskipTests package
```
2. Start server:
```bat
cd "d:\dự án 3d\D-N-3d\backend"
mvn spring-boot:run
```

Backend defaults:
- Port: `8080`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- Health: `http://localhost:8080/api/health`
- WebSocket: `ws://localhost:8080/ws/visitor-count`

---

## 4) Frontend setup
Open file:
- `frontend/index.html`

Recommended:
- Use **Live Server** so module scripts + fetch can work.

Frontend calls:
- `/api/skills`
- `/api/projects`
- `/api/contact`
- `/api/visitor/count`

---

## 5) Notes / Troubleshooting
- CORS is configured via `backend/src/main/resources/application.properties` key:
  - `cors.allowed-origins=http://localhost:3000,http://127.0.0.1:5500`
- If you open frontend using a different origin/port, update `cors.allowed-origins`.

---

## 6) WebSocket visitor counter
Frontend connects to:
- `ws://<host>:8080/ws/visitor-count`

Counter updates whenever:
- `POST /api/visitor/track` is called.

