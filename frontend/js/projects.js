/*
  projects.js
  - Fetches projects from backend and renders interactive 3D flip cards
  - Includes modal open/close and skeleton loading
*/

import { api } from './api.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function showSkeleton(isShowing) {
  const skeleton = document.getElementById('projectsSkeleton');
  if (!skeleton) return;
  skeleton.style.display = isShowing ? 'grid' : 'none';
}

function clearProjects() {
  const grid = document.getElementById('projectsGrid');
  if (grid) grid.innerHTML = '';
}

function parseTechStack(techStack) {
  // Backend might return stringified JSON.
  if (!techStack) return [];
  if (Array.isArray(techStack)) return techStack;
  if (typeof techStack === 'string') {
    try {
      const parsed = JSON.parse(techStack);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // fallback: comma split
    }
    return techStack.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

function createBadge(label) {
  const b = document.createElement('span');
  b.className = 'badge';
  b.textContent = label;
  return b;
}

function openModal(project) {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const title = document.getElementById('projectModalTitle');
  const badges = document.getElementById('projectModalBadges');
  const tech = document.getElementById('projectModalTech');
  const demo = document.getElementById('projectModalDemo');
  const source = document.getElementById('projectModalSource');
  const desc = document.getElementById('projectModalDescription');

  const techList = parseTechStack(project.techStack);

  title.textContent = project.title || 'Project';
  badges.innerHTML = '';
  if (project.category) badges.appendChild(createBadge(project.category));
  if (project.isFeatured) badges.appendChild(createBadge('Featured'));

  tech.innerHTML = '';
  for (const t of techList.slice(0, 12)) tech.appendChild(createBadge(t));

  demo.href = project.demoUrl || '#';
  source.href = project.githubUrl || '#';
  desc.textContent = project.description || '';

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}

function createProjectCard(project) {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  const card = document.createElement('div');
  card.className = 'project-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Open project: ${project.title}`);

  const inner = document.createElement('div');
  inner.className = 'project-card__inner';

  const front = document.createElement('div');
  front.className = 'project-card__face project-card__front';

  const thumb = document.createElement('div');
  thumb.className = 'project-card__thumb';
  thumb.textContent = 'Preview';

  const title = document.createElement('div');
  title.className = 'project-card__title';
  title.textContent = project.title || 'Project';

  const badges = document.createElement('div');
  badges.className = 'project-card__badges';
  if (project.category) badges.appendChild(createBadge(project.category));
  if (project.isFeatured) badges.appendChild(createBadge('Featured'));

  const back = document.createElement('div');
  back.className = 'project-card__face project-card__back';
  const backTitle = document.createElement('div');
  backTitle.className = 'project-card__title';
  backTitle.textContent = project.title || 'Project';

  const stackLine = document.createElement('div');
  stackLine.style.color = 'rgba(224,224,224,0.75)';
  stackLine.style.lineHeight = '1.7';
  stackLine.style.marginTop = '8px';
  const techList = parseTechStack(project.techStack);
  stackLine.textContent = `Tech: ${techList.slice(0, 5).join(' • ') || '—'}`;

  const actions = document.createElement('div');
  actions.className = 'project-card__actions';

  const moreBtn = document.createElement('button');
  moreBtn.type = 'button';
  moreBtn.className = 'btn btn--primary';
  moreBtn.style.padding = '10px 14px';
  moreBtn.textContent = 'Details';
  moreBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(project);
  });

  actions.appendChild(moreBtn);

  front.appendChild(thumb);
  front.appendChild(title);
  front.appendChild(badges);

  back.appendChild(backTitle);
  back.appendChild(stackLine);
  back.appendChild(actions);

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  const onOpen = () => openModal(project);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  });

  card.addEventListener('click', onOpen);

  grid.appendChild(card);
}

async function loadProjects(category) {
  clearProjects();
  showSkeleton(true);

  let projects = [];
  try {
    projects = await api.getProjects(category);
  } catch {
    // fallback dataset
    projects = [
      {
        id: 1,
        title: 'Galaxy Portfolio API',
        description: 'Interactive journey backend with visitor tracking + project endpoints.',
        techStack: '["Java","Spring Boot","MySQL","WebSocket","Swagger"]',
        category: 'Full-Stack',
        githubUrl: 'https://github.com/',
        demoUrl: 'https://example.com/',
        imageUrl: '',
        orderIndex: 1,
        isFeatured: true
      },
      {
        id: 2,
        title: 'Skill Solar System',
        description: 'Front-end 3D skill visualization with animated tooltips.',
        techStack: '["Three.js","WebGL","Chart.js","GSAP"]',
        category: 'Web',
        githubUrl: 'https://github.com/',
        demoUrl: 'https://example.com/',
        imageUrl: '',
        orderIndex: 2,
        isFeatured: false
      },
      {
        id: 3,
        title: 'Contact Rocket Mailer',
        description: 'Validated contact form with DB persistence + email notification.',
        techStack: '["Spring Mail","Validation","JPA","Docker"]',
        category: 'Java',
        githubUrl: 'https://github.com/',
        demoUrl: 'https://example.com/',
        imageUrl: '',
        orderIndex: 3,
        isFeatured: false
      }
    ];
  } finally {
    // small delay for skeleton visibility
    setTimeout(() => showSkeleton(false), 450);
  }

  // Order by orderIndex if exists
  projects.sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
  projects.forEach((p) => createProjectCard(p));
}

export function initProjects() {
  const filterBar = document.getElementById('projectsFilterBar');
  if (!filterBar) return;

  const buttons = $$('[data-category]', filterBar);

  // Modal close handlers
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.getAttribute('data-close') === 'true') closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  const setActive = (btn) => {
    buttons.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const category = btn.getAttribute('data-category') || 'All';
      setActive(btn);
      await loadProjects(category);
    });
  });

  // Initial load
  const active = buttons.find((b) => b.classList.contains('is-active'));
  const initialCategory = active ? active.getAttribute('data-category') : 'All';
  loadProjects(initialCategory || 'All');
}

