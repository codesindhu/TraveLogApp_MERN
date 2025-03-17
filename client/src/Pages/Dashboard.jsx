// client/src/Pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogCard from '../components/LogCard';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [media, setMedia] = useState(null);
  const navigate = useNavigate();

  const fetchLogs = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/logs`);
    const data = await res.json();
    setLogs(data);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setMedia(reader.result);
    reader.readAsDataURL(file);
  };

  const addLog = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/api/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, experience, media }),
    });
    setTitle('');
    setExperience('');
    setMedia(null);
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
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Travel Logs ✈️</h2>
      <form onSubmit={addLog} className="mb-5">
        <div className="mb-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Destination"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Your experience..."
            className="form-control"
            rows={3}
            required
          />
        </div>
        <div className="mb-3">
          <input type="file" accept="image/*,video/*" onChange={handleFile} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Add Log</button>
      </form>

      <ul className="list-unstyled">
        {logs.map((log) => (
          <LogCard key={log._id} log={log} onDelete={deleteLog} />
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
