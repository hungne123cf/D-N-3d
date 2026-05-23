# TODO — Portfolio Interactive Journey (D-N-3d)

## Phase 1 (Frontend) — Completed
- [x] Create `frontend/index.html`
- [x] Create `frontend/css/main.css`
- [x] Create `frontend/css/animations.css`
- [x] Create `frontend/css/particles.css`
- [x] Create `frontend/css/responsive.css`
- [x] Create `frontend/js/main.js`
- [x] Create supporting FE modules: `three-scene.js`, `particles.js`, `cursor.js`, `scroll-animation.js`, `api.js`, `typewriter.js`, `skill-chart.js`, `projects.js`, `experience.js`, `contact.js`, `skills-scene.js`

## Phase 2 (Backend) — Next
- [ ] Create Spring Boot project structure under `backend/`
- [ ] Implement entities: `Visitor`, `Contact`, `Project`, `Skill`
- [ ] Implement repositories
- [ ] Implement services
- [ ] Implement controllers with endpoints:
  - [ ] `GET /api/skills`
  - [ ] `GET /api/projects`
  - [ ] `GET /api/projects/{id}`
  - [ ] `POST /api/contact`
  - [ ] `GET /api/visitor/count`
  - [ ] `POST /api/visitor/track`
  - [ ] `GET /api/visitor/stats`
  - [ ] `GET /api/health`
- [ ] Add CORS config for localhost:5500/3000
- [ ] Add Security config (permit all for frontend + swagger)
- [ ] Add Swagger/OpenAPI
- [ ] Add WebSocket `/ws/visitor-count`

## Phase 3 (Database)
- [x] Create `database/schema.sql`
- [x] Create `database/seed.sql`
- [ ] Ensure indexes align with queries


## Phase 4 (Docs & Validation)
- [x] Update `README.md` with run steps
- [ ] Test FE->BE API calls (skills/projects/contact)
- [ ] Test WebSocket realtime counter


