/*
  skill-chart.js
  - Fetches skills from backend
  - Initializes Chart.js radar chart
  - Renders animated bar list
*/

import { api } from './api.js';

function safeNumber(v, fallback = 0) {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function extractByCategory(skills) {
  const categories = ['Development', 'Database', 'Documentation'];
  const result = {};
  for (const cat of categories) result[cat] = 0;

  // Assume backend returns { name, category, proficiencyLevel } or similar.
  for (const s of skills) {
    const cat = s.category || s.cat || s.group;
    const key = categories.includes(cat) ? cat : 'Development';
    const level = safeNumber(s.proficiencyLevel ?? s.proficiency ?? s.level, 0);
    result[key] = Math.max(result[key], level);
  }

  return result;
}

function renderBars(categories) {
  const root = document.getElementById('skillsBarList');
  if (!root) return;

  root.innerHTML = '';
  const entries = Object.entries(categories);
  const colors = {
    Development: '#00f5ff',
    Database: '#2cff7d',
    Documentation: '#bf00ff'
  };

  for (const [name, value] of entries) {
    const pct = Math.max(0, Math.min(100, value));

    const item = document.createElement('div');
    item.className = 'skill-bar-item';
    item.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <div style="font-weight:900; color: rgba(224,224,224,0.85);">${name}</div>
        <div style="font-weight:900; color:#fff;">${pct}%</div>
      </div>
      <div style="height:10px; border-radius:999px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10); overflow:hidden;">
        <div class="skill-bar-item__fill" style="height:100%; width:0%; background: linear-gradient(90deg, ${colors[name] || '#00f5ff'}, rgba(191,0,255,0.35)); box-shadow: 0 0 18px rgba(0,245,255,0.18);"></div>
      </div>
    `;

    root.appendChild(item);

    const fill = item.querySelector('.skill-bar-item__fill');
    setTimeout(() => {
      if (fill) fill.style.width = `${pct}%`;
    }, 200);
  }
}

function createRadarChart(labels, values) {
  const canvas = document.getElementById('skillsRadarChart');
  if (!canvas || !window.Chart) return null;

  const ctx = canvas.getContext('2d');

  // eslint-disable-next-line no-undef
  return new window.Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets: [
        {
          label: 'Proficiency',
          data: values,
          borderWidth: 2,
          pointRadius: 3,
          borderColor: '#00f5ff',
          backgroundColor: 'rgba(0,245,255,0.12)',
          pointBackgroundColor: '#bf00ff'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          grid: { color: 'rgba(255,255,255,0.10)' },
          angleLines: { color: 'rgba(255,255,255,0.10)' },
          pointLabels: { color: 'rgba(224,224,224,0.82)', font: { size: 12, weight: '700' } },
          suggestedMin: 0,
          suggestedMax: 100
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(5,5,16,0.95)',
          borderColor: 'rgba(0,245,255,0.18)',
          borderWidth: 1
        }
      }
    }
  });
}

export async function initSkillChartAndFetch() {
  // Typewriter role
  try {
    const { initTypewriter } = await import('./typewriter.js');
    initTypewriter();
  } catch {
    // ignore
  }

  let skills = [];
  try {
    skills = await api.getSkills();
  } catch {
    // Fallback demo data
    skills = [
      { name: 'Java', category: 'Development', proficiencyLevel: 92 },
      { name: 'JavaScript', category: 'Development', proficiencyLevel: 84 },
      { name: 'HTML/CSS', category: 'Development', proficiencyLevel: 88 },
      { name: 'MySQL', category: 'Database', proficiencyLevel: 86 },
      { name: 'Redis', category: 'Database', proficiencyLevel: 70 },
      { name: 'System Design', category: 'Documentation', proficiencyLevel: 82 },
      { name: 'Agile/Scrum', category: 'Documentation', proficiencyLevel: 76 }
    ];
  }

  const categories = extractByCategory(skills);
  renderBars(categories);

  const radarLabels = ['Java', 'JS/TS', 'APIs', 'MySQL', 'Docs'];
  const radarValues = [
    safeNumber(skills.find((s) => /java/i.test(s.name || ''))?.proficiencyLevel, 88),
    safeNumber(skills.find((s) => /(js|type)/i.test(s.name || ''))?.proficiencyLevel, 82),
    80,
    safeNumber(skills.find((s) => /mysql/i.test(s.name || ''))?.proficiencyLevel, 84),
    safeNumber(skills.find((s) => /system design|docs|writing/i.test(s.name || ''))?.proficiencyLevel, 78)
  ];

  createRadarChart(radarLabels, radarValues);

  // Skills tooltip + interactivity in three-scene would be handled there.
}

