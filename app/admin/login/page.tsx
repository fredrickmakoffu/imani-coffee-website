"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Login failed');
      }
      const data = await response.json();
      // Assume data contains a token and user info
      localStorage.setItem('token', data.token);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  }
  
  return (
    <section
      id="contact"
      className="px-12 bg-bridal-health text-trace-ash"
    >
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded w-[30rem] min-w-[300px]">
            <h1 className="mb-4 text-xl font-bold">Admin Login</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <label className="block mb-2">
            <div className="mb-1">Email:</div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full"
                required
            />
            </label>
            <label className="block mb-4">
            <div className="mb-1">Password:</div>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full"
                required
            />
            </label>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        </form>
      </div>
    </section>
  );
}
