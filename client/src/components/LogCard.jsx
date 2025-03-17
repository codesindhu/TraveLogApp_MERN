// client/src/components/LogCard.jsx
import { useNavigate } from 'react-router-dom';

function LogCard({ log, onDelete }) {
  const navigate = useNavigate();

  return (
    <li className="card mb-3 p-3">
      <h5>{log.title}</h5>
      <p>{log.experience}</p>
      {log.media && (
        <>
          {log.media.startsWith('data:image') ? (
            <img src={log.media} alt="log" className="img-fluid rounded mb-2" />
          ) : (
            <video src={log.media} controls className="img-fluid rounded mb-2" />
          )}
        </>
      )}
      <small className="text-muted">{new Date(log.date).toLocaleString()}</small>
      <div className="mt-2">
        <button className="btn btn-info btn-sm me-2" onClick={() => navigate(`/log/${log._id}`)}>📖 View</button>
        <button className="btn btn-warning btn-sm me-2" onClick={() => navigate(`/log/${log._id}/edit`)}>✏️ Edit</button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(log._id)}>🗑 Delete</button>
      </div>
    </li>
  );
}

export default LogCard;
