const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = {
  me: async () => {
    const response = await fetch(`${BASE_URL}/api/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  },
  login: async (email, password) => {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },
  register: async (name, email, password) => {
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },
  logout: async () => {
    localStorage.removeItem('token');
  },
  createSession: async (platform, score) => {
    const response = await fetch(`${BASE_URL}/api/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ platform, score }),
    });
    return response.json();
  },
  getSessions: async () => {
    const response = await fetch(`${BASE_URL}/api/sessions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  },
};

const auth = {
  me: api.me,
  login: api.login,
  register: api.register,
  logout: api.logout,
};

export { api, auth };