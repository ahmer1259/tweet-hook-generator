import React, { useState } from 'react';
import 'App.css';

function App() {
  const [input, setInput] = useState('');
  const [hooks, setHooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateHooks = async () => {
    if (!input) return;

    setLoading(true);
    setHooks([]);

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Write 5 engaging tweet hooks for: "${input}"`,
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const result = data.choices[0].text.trim().split('\n').filter(Boolean);
    setHooks(result);
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>Tweet Hook Generator</h1>
      <textarea
        rows="4"
        placeholder="Enter your idea or topic..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={generateHooks} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Hooks'}
      </button>
      <div className="results">
        {hooks.map((hook, index) => (
          <p key={index}>{hook}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
