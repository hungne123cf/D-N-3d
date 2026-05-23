/*
  api.js
  - Small fetch wrapper for backend APIs
  - Uses JSON, retries lightly, and normalizes errors.
*/

function getApiBase() {
  return (window.__PORTFOLIO_CONFIG__ && window.__PORTFOLIO_CONFIG__.apiBaseUrl) ? window.__PORTFOLIO_CONFIG__.apiBaseUrl : '';
}

async function request(path, { method = 'GET', body = null, signal = null } = {}) {
  const url = `${getApiBase()}${path}`;
  const headers = {
    'Accept': 'application/json'
  };

  if (body !== null) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body !== null ? JSON.stringify(body) : null,
    signal
  });

  if (!res.ok) {
    let detail = '';
    try {
      detail = await res.text();
    } catch {
      // ignore
    }
    const err = new Error(`Request failed: ${res.status} ${res.statusText}`);
    err.detail = detail;
    throw err;
  }

  // Some endpoints might return empty body
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return await res.json();
  }
  return null;
}

export const api = {
  async getSkills() {
    return request('/api/skills');
  },
  async getProjects(category = 'All') {
    const qs = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    return request(`/api/projects${qs}`);
  },
  async getProjectById(id) {
    return request(`/api/projects/${encodeURIComponent(id)}`);
  },
  async submitContact(payload) {
    return request('/api/contact', { method: 'POST', body: payload });
  },
  async getVisitorCount() {
    const data = await request('/api/visitor/count');
    return data && typeof data.count === 'number' ? data.count : 0;
  }
};

