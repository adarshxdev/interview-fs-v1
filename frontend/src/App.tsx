import { useState } from 'react';
import { Button } from 'react-daisyui';

function App() {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const fetchMessage = async () => {
      const res = await fetch('/api/message');
      const text = await res.text();
      setMessage(text);
  };

  const onLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const tokenReceived = data.token;

      setToken(tokenReceived);
      console.log('TOKEN =', tokenReceived);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check credentials or server.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-red-300 p-4">
      <input
        className="input input-bordered"
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input input-bordered"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" onClick={onLogin}>
        Login
      </Button>
      <Button color="primary" onClick={fetchMessage}>
        Get Welcome Message
      </Button>

      {token && <div className="text-green-700 font-bold">Token: {token}</div>}
      {message && <div className="text-lg font-bold">{message}</div>}
      {error && <div className="text-red-700 font-bold">{error}</div>}
    </div>
  );
}

export default App;

