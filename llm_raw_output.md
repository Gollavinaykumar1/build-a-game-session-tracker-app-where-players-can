# LLM Output

=== FILE: src/App.jsx ===
import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Sessions from './Sessions';
import Login from './Login';
import Register from './Register';
import { auth } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await auth.me();
        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <HashRouter>
      <nav className="bg-gray-800 text-white p-4">
        <Link to="/" className="mr-4">
          Home
        </Link>
        {user && (
          <>
            <Link to="/sessions" className="mr-4">
              Sessions
            </Link>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={async () => {
                await auth.logout();
                setUser(null);
              }}
            >
              Logout
            </button>
          </>
        )}
        {!user && (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sessions" element={<Sessions user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
=== END ===

=== FILE: src/main.jsx ===
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
=== END ===

=== FILE: src/index.css ===
@tailwind base;
@tailwind components;
@tailwind utilities;
=== END ===

=== FILE: src/api.js ===
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
=== END ===