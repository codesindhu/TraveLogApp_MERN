// client/src/Pages/EditLog.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditLog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [media, setMedia] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLog = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/logs/${id}`);
      const data = await res.json();
      if (!data.error) {
        setTitle(data.title);
        setExperience(data.experience);
        setMedia(data.media || '');
      }
      setLoading(false);
    };
    fetchLog();
  }, [id]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setMedia(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/api/logs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, experience, media }),
    });
    navigate('/dashboard');
  };

  if (loading) return <h4 className="text-center mt-4">Loading...</h4>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Edit Travel Log ✏️</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Destination"
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Your experience..."
            rows={4}
            required
          />
        </div>
        <div className="mb-3">
          <input type="file" accept="image/*,video/*" onChange={handleFile} className="form-control" />
        </div>
        <button type="submit" className="btn btn-success">Update Log</button>
      </form>
    </div>
  );
}

export default EditLog;
