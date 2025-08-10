import { useState } from 'react';

type Mark = { subject: string; marks: number };
type Result = {
  rollNumber: string;
  studentName: string;
  className?: string;
  marks: Mark[];
  total?: number;
  percentage?: number;
};

// Mock dataset for demo (no backend)
const MOCK_RESULTS: Result[] = [
  {
    rollNumber: '101',
    studentName: 'Aarav Sharma',
    className: '8-A',
    marks: [
      { subject: 'Subject1', marks: 88 },
      { subject: 'Subject2', marks: 74 },
      { subject: 'Subject3', marks: 92 },
      { subject: 'Subject4', marks: 81 },
      { subject: 'Subject5', marks: 69 },
      { subject: 'Subject6', marks: 77 },
    ],
  },
  {
    rollNumber: '102',
    studentName: 'Ira Patel',
    className: '8-A',
    marks: [
      { subject: 'Subject1', marks: 91 },
      { subject: 'Subject2', marks: 86 },
      { subject: 'Subject3', marks: 84 },
      { subject: 'Subject4', marks: 73 },
      { subject: 'Subject5', marks: 78 },
      { subject: 'Subject6', marks: 88 },
    ],
  },
  {
    rollNumber: '103',
    studentName: 'Kabir Singh',
    className: '8-B',
    marks: [
      { subject: 'Subject1', marks: 65 },
      { subject: 'Subject2', marks: 71 },
      { subject: 'Subject3', marks: 69 },
      { subject: 'Subject4', marks: 72 },
      { subject: 'Subject5', marks: 61 },
      { subject: 'Subject6', marks: 67 },
    ],
  },
];

function withTotals(r: Result): Result {
  const total = r.marks.reduce((s, m) => s + (m.marks || 0), 0);
  const percentage = r.marks.length ? Math.round((total / (r.marks.length * 100)) * 10000) / 100 : 0;
  return { ...r, total, percentage };
}

export default function Results() {
  const [roll, setRoll] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const useMock = (import.meta.env.VITE_USE_MOCK ?? 'true') === 'true';
  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    setError(null);

    if (useMock) {
      const found = MOCK_RESULTS.find((r) => r.rollNumber === roll.trim());
      if (!found) {
        setError('Result not found in demo data');
        return;
      }
      setResult(withTotals(found));
      return;
    }

    try {
      const res = await fetch(`${apiBase}/results/${encodeURIComponent(roll)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Not found');
      setResult(withTotals(data));
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Examination Results</h1>
      {useMock && (
        <p className="mb-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2">
          Demo mode: try roll numbers 101, 102, or 103.
        </p>
      )}
      <form onSubmit={handleSearch} className="bg-white rounded-lg shadow p-6 flex gap-3">
        <input value={roll} onChange={(e) => setRoll(e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="Enter Roll Number" />
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Search</button>
      </form>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {result && (
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{result.studentName}</h2>
              <p className="text-gray-600">Roll: {result.rollNumber}{result.className ? ` • Class: ${result.className}` : ''}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Total: {result.total ?? 0}</p>
              <p className="text-gray-600">Percentage: {result.percentage ?? 0}%</p>
            </div>
          </div>
          <div className="mt-4">
            <table className="w-full text-left border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Subject</th>
                  <th className="p-2 border">Marks</th>
                </tr>
              </thead>
              <tbody>
                {result.marks?.map((m, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border">{m.subject}</td>
                    <td className="p-2 border">{m.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}


