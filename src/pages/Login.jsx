import React, { useState } from 'react';

function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async login (replace with real auth logic)
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <img
          src="/Octocat.png"
          alt="App Logo"
          className="w-12 h-12 mb-4 rounded-full shadow"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Welcome</h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleLoginClick}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Password"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            aria-busy={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div className="mt-6 text-xs text-gray-400 text-center">
          Your session is private and secure.
        </div>
      </div>
    </div>
  );
}

export default Login;
