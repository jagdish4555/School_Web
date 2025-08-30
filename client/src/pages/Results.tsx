import { useState } from 'react';
import { Search, User, Hash, BookOpen, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface Mark {
  subject: string;
  marks: number;
}

interface Result {
  _id: string;
  rollNumber: string;
  studentName: string;
  className?: string;
  examDescription?: string;
  marks: Mark[];
  totalMarksGained: number;
  totalPossibleMarks: number;
  percentage: number;
  result: string;
  createdAt: string;
}

export default function Results() {
  const [rollNumber, setRollNumber] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!rollNumber.trim()) {
      setError('Please enter a roll number');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`http://localhost:5000/api/results/${rollNumber.trim()}`);
      if (!response.ok) {
        setError(response.status === 404 ? 'Result not found for this roll number' : 'Failed to fetch result');
        return;
      }
      const data = await response.json();
      setResult(data);
    } catch {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    if (percentage >= 75) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    if (percentage >= 35) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
  };

  const isPass = result?.result?.toLowerCase().includes('pass');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl">
        {/* Card container */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8 text-center">
            <h1 className="text-3xl font-extrabold">SHETH D.H. HIGH SCHOOL, JAGUDAN</h1>
            <p className="mt-1 text-blue-100">At- Jagudan, Ta- Dist- Mehsana</p>
          </div>

          {/* Search Section */}
          <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Check Your Result</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="Enter Roll Number"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Search className="h-4 w-4" />
                )}
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Result */}
          {result && (
            <div className="px-6 py-8">
              {/* Exam Details */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {result.examDescription || 'Examination Result'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2 mt-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(result.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}
                </p>
              </div>

              {/* Student Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center gap-3">
                  <Hash className="text-blue-500 h-5 w-5" />
                  <div>
                    <p className="text-xs text-gray-500">Roll Number</p>
                    <p className="font-semibold">{result.rollNumber}</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center gap-3">
                  <User className="text-blue-500 h-5 w-5" />
                  <div>
                    <p className="text-xs text-gray-500">Student Name</p>
                    <p className="font-semibold">{result.studentName}</p>
                  </div>
                </div>
                {result.className && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center gap-3">
                    <BookOpen className="text-blue-500 h-5 w-5" />
                    <div>
                      <p className="text-xs text-gray-500">Class</p>
                      <p className="font-semibold">{result.className}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Subject Marks */}
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subject-wise Performance</h4>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      <th className="px-4 py-3 text-left">Subject</th>
                      <th className="px-4 py-3 text-center">Marks Obtained</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {result.marks.map((mark, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                        <td className="px-4 py-3">{mark.subject}</td>
                        <td className="px-4 py-3 text-center font-semibold">{mark.marks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
                  <p className="text-sm text-blue-600 dark:text-blue-400">Marks Obtained</p>
                  <p className="text-2xl font-bold">{result.totalMarksGained}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Marks</p>
                  <p className="text-2xl font-bold">{result.totalPossibleMarks}</p>
                </div>
                <div className={`p-4 rounded-xl text-center ${getGradeColor(result.percentage)}`}>
                  <p className="text-sm">Percentage</p>
                  <p className="text-2xl font-bold">{result.percentage}%</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center flex flex-col items-center">
                  {isPass ? <CheckCircle className="h-6 w-6 text-green-500 mb-1" /> : <XCircle className="h-6 w-6 text-red-500 mb-1" />}
                  <p className={`text-lg font-bold ${isPass ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {result.result}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
            <p>This is a computer generated result. For any discrepancies, please contact the school administration.</p>
            <p className="mt-1">Generated on: {new Date().toLocaleDateString('en-IN')} at {new Date().toLocaleTimeString('en-IN')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
