import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL || ''}/auth/login`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    localStorage.setItem("accessToken", response.data.access_token);
    navigate("/");
  } catch (err) {
    setError("Invalid username or password");
  }
};


  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            className="w-full border rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
      <p className="mt-4">
        Don't have an account? <Link to="/auth/register" className="text-blue-600">Register</Link>
      </p>
    </div>
  );
}

function Register() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || ''}/auth/register`, {
        username,
        full_name: fullName,
        email,
        password
      });
      navigate("/auth/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Full Name:</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            className="w-full border rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            className="w-full border rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
      <p className="mt-4">
        Already have an account? <Link to="/auth/login" className="text-blue-600">Login</Link>
      </p>
    </div>
  );
}

function Auth() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default Auth;