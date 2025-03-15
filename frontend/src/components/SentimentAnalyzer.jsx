import React, { useState } from 'react';
import axios from 'axios';

function SentimentAnalyzer() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || ''}/api/sentiment`, {
        text: inputText,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      });
      setResult(response.data.sentiment);
    } catch (error) {
      setResult([{ label: 'Error', score: 0 }]);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Sentiment Analyzer</h2>
      <form onSubmit={handleAnalyze} className="space-y-4">
        <div>
          <label className="block text-gray-700">Input Text:</label>
          <textarea
            className="w-full border rounded p-2"
            rows="4"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold">Sentiment Result:</h3>
          {result.map((res, idx) => (
            <p key={idx}>
              {res.label} - {(res.score * 100).toFixed(2)}%
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default SentimentAnalyzer;