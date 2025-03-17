// client/src/Pages/ViewLog.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewLog() {
  const { id } = useParams();
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLog = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/logs/${id}`);
      const data = await res.json();
      setLog(data);
      setLoading(false);
    };
    fetchLog();
  }, [id]);

  if (loading) return <h4 className="text-center mt-4">Loading...</h4>;
  if (!log) return <p className="text-center mt-4 text-danger">Log not found!</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">{log.title}</h2>
      <p>{log.experience}</p>
      {log.media && (
        <>
          {log.media.startsWith('data:image') ? (
            <img src={log.media} alt="media" className="img-fluid rounded mb-3" />
          ) : (
            <video src={log.media} controls className="img-fluid rounded mb-3" />
          )}
        </>
      )}
      <small className="text-muted">Posted on: {new Date(log.date).toLocaleString()}</small>
    </div>
  );
}

export default ViewLog;
