import React, { useState } from 'react';
import axios from 'axios';

function TextGenerator() {
  const [prompt, setPrompt] = useState('');
  const [maxLength, setMaxLength] = useState(50);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || ''}/api/generate`, {
        text: prompt,
        max_length: maxLength,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      });
      setResult(response.data.generated_text);
    } catch (error) {
      setResult('Error generating text.');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Text Generator</h2>
      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="block text-gray-700">Prompt:</label>
          <textarea
            className="w-full border rounded p-2"
            rows="4"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700">Max Length:</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={maxLength}
            onChange={(e) => setMaxLength(Number(e.target.value))}
            min="10"
            max="200"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>
      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold">Generated Text:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default TextGenerator;