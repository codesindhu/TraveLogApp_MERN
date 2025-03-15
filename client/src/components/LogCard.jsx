import { useNavigate } from 'react-router-dom';

function LogCard({ log, onDelete }) {
  const navigate = useNavigate();

  return (
    <li style={styles.card}>
      <h3>{log.title}</h3>
      <p>{log.experience}</p>
      <small>{new Date(log.date).toLocaleString()}</small>
      <div style={styles.actions}>
        <button onClick={() => navigate(`/log/${log._id}`)}>📖 View</button>
        <button onClick={() => navigate(`/log/${log._id}/edit`)}>✏️ Edit</button>
        <button onClick={() => onDelete(log._id)}>🗑 Delete</button>
      </div>
    </li>
  );
}

const styles = {
  card: {
    background: '#ffffff',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
};

export default LogCard;
