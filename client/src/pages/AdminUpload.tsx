import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UploadResponse {
  insertedOrUpdated: number;
}

export default function AdminUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/developer-login');
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/developer-login');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
          selectedFile.type === 'application/vnd.ms-excel') {
        setFile(selectedFile);
        setMessage('');
      } else {
        setMessage('Please select a valid Excel file (.xlsx or .xls)');
        setMessageType('error');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload');
      setMessageType('error');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/results/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data: UploadResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      setMessage(`Successfully uploaded ${data.insertedOrUpdated} results`);
      setMessageType('success');
      setFile(null);
      // Reset file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (err: any) {
      setMessage(err.message || 'Failed to upload file');
      setMessageType('error');
    } finally {
      setUploading(false);
    }
  };

  const handleClear = async () => {
    if (!confirm('Are you sure you want to clear all results? This action cannot be undone.')) {
      return;
    }

    setClearing(true);
    setMessage('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/results/clear', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to clear results');
      }

      setMessage('All results have been cleared successfully');
      setMessageType('success');
    } catch (err: any) {
      setMessage(err.message || 'Failed to clear results');
      setMessageType('error');
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-green-900 dark:to-blue-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Admin Panel
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Upload and manage exam results
          </p>
        </div>

        {/* Logout Button */}
        <div className="text-right mb-6">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>

        {/* Upload Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Upload Results
          </h2>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Excel File
            </label>
            <input
              id="file-input"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Supported formats: .xlsx, .xls
            </p>
          </div>

          {/* File Info */}
          {file && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Selected File:</h3>
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Name:</strong> {file.name}
              </p>
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Type:</strong> {file.type}
              </p>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {uploading ? 'Uploading...' : 'Upload Results'}
          </button>

          {/* Message */}
          {message && (
            <div className={`p-4 rounded-lg ${
              messageType === 'success' 
                ? 'bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700' 
                : 'bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700'
            }`}>
              <p className={`text-sm ${
                messageType === 'success' 
                  ? 'text-green-600 dark:text-green-300' 
                  : 'text-red-600 dark:text-red-300'
              }`}>
                {message}
              </p>
            </div>
          )}
        </div>

        {/* Clear Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Database Management
          </h2>

          <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-yellow-400">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Warning
                </h3>
                <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <p>
                    Clearing the database will permanently delete all uploaded results. 
                    This action cannot be undone. Please make sure you have a backup 
                    if needed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleClear}
            disabled={clearing}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {clearing ? 'Clearing...' : 'Clear All Results'}
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Excel File Format Instructions
          </h2>
          
          <div className="space-y-4">
                         <div>
               <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Required Columns:</h3>
               <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                 <li><strong>પરીક્ષા નં.</strong> or <strong>RollNumber</strong> - Student's roll number (unique identifier)</li>
                 <li><strong>વિદ્યાર્થીનું નામ</strong> or <strong>StudentName</strong> - Student's full name</li>
                 <li><strong>Class</strong> - Student's class (optional)</li>
                 <li><strong>વિષય 1, વિષય 2, વિષય 3...</strong> - Subject-wise marks (dynamic number of subjects)</li>
                 <li><strong>Marks Gained</strong> or <strong>TotalMarksGained</strong> - Total marks obtained by student</li>
                 <li><strong>Total Marks</strong> or <strong>TotalPossibleMarks</strong> - Maximum possible marks (e.g., 1600)</li>
                 <li><strong>પરિણામ</strong> or <strong>Result</strong> - Pass/Fail status (પાસ/નાપાસ or PASS/FAIL)</li>
               </ul>
             </div>

                         <div>
               <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example Format:</h3>
               <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                 <table className="text-sm">
                   <thead>
                     <tr>
                       <th className="px-2 py-1 border">પરીક્ષા નં.</th>
                       <th className="px-2 py-1 border">વિદ્યાર્થીનું નામ</th>
                       <th className="px-2 py-1 border">વિષય 1</th>
                       <th className="px-2 py-1 border">વિષય 2</th>
                       <th className="px-2 py-1 border">વિષય 3</th>
                       <th className="px-2 py-1 border">Marks Gained</th>
                       <th className="px-2 py-1 border">Total Marks</th>
                       <th className="px-2 py-1 border">પરિણામ</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                       <td className="px-2 py-1 border">901</td>
                       <td className="px-2 py-1 border">A</td>
                       <td className="px-2 py-1 border">85</td>
                       <td className="px-2 py-1 border">92</td>
                       <td className="px-2 py-1 border">78</td>
                       <td className="px-2 py-1 border">648</td>
                       <td className="px-2 py-1 border">1600</td>
                       <td className="px-2 py-1 border">પાસ</td>
                     </tr>
                   </tbody>
                 </table>
               </div>
             </div>

                         <div>
               <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Notes:</h3>
               <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                 <li>Roll numbers must be unique for each student</li>
                 <li>Subject columns can vary in number (6-16 subjects depending on class)</li>
                 <li>Marks should be numerical values</li>
                 <li>Total marks gained and total possible marks come from Excel columns</li>
                 <li>Pass/Fail result comes from Excel column (પાસ/નાપાસ or PASS/FAIL)</li>
                 <li>Empty cells will be ignored</li>
                 <li>Existing results with the same roll number will be updated</li>
               </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
