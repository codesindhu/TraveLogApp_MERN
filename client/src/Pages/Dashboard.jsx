import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogCard from '../components/LogCard';

function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('');
  const navigate = useNavigate();

  const fetchLogs = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/logs`)
    const data = await res.json();
    setLogs(data);
  };

  const addLog = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/api/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, experience }),
    });
    setTitle('');
    setExperience('');
    fetchLogs();
  };
  
  const deleteLog = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/logs/${id}`, {
      method: 'DELETE',
    });
    fetchLogs();
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="container">
      <h1>My Travel Logs ✈️</h1>
      <form onSubmit={addLog}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Destination"
          required
        />
        <textarea
          value={experience}
          onChange={e => setExperience(e.target.value)}
          placeholder="Your experience..."
          required
        />
        <button type="submit">Add Log</button>
      </form>

      <ul>
        {logs.map(log => (
          <LogCard key={log._id} log={log} onDelete={deleteLog} />
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
