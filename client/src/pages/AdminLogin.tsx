import { useState } from 'react';

export default function AdminLogin() {
  const [username, setUsername] = useState('principal');
  const [password, setPassword] = useState('password123');
  const [token, setToken] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
  const demoMode = (import.meta.env.VITE_USE_MOCK ?? 'true') === 'true';

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (demoMode) {
      setToken('demo-token');
      setMessage('Demo mode: logged in');
      return;
    }
    try {
      const res = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Login failed');
      setToken(data.token);
      setMessage('Logged in as principal');
    } catch (err: any) {
      setMessage(err.message);
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (demoMode) { setMessage('Demo mode: upload disabled'); return; }
    if (!file || !token) return;
    setMessage(null);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch(`${apiBase}/results/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Upload failed');
      setMessage(`Uploaded: ${data.insertedOrUpdated} records`);
    } catch (err: any) {
      setMessage(err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
      {!token ? (
        <form onSubmit={handleLogin} className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="principal" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="••••••" />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2">Login</button>
        </form>
      ) : (
        <form onSubmit={handleUpload} className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Upload Results (Excel)</label>
            <input type="file" accept=".xls,.xlsx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white rounded py-2">Upload</button>
          <p className="text-sm text-gray-500">Expected columns: RollNumber, StudentName, Class, Subject1..Subject7</p>
        </form>
      )}
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
}


