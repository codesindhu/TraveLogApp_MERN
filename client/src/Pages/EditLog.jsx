import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditLog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/logs/${id}`);
        const data = await res.json();
        if (!data.error) {
          setTitle(data.title);
          setExperience(data.experience);
        }
      } catch (err) {
        console.error('Error fetching log:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/api/logs/${id}` , {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, experience }),
    });
    navigate('/dashboard');
  };

  if (loading) return <h2 style={styles.loading}>Loading...</h2>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Travel Log ✏️</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Destination"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          style={styles.textarea}
          placeholder="Your experience..."
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          rows={5}
          required
        />
        <button type="submit" style={styles.button}>
          Update Log
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '3rem auto',
    background: '#fefefe',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 0 12px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#0099cc',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  button: {
    backgroundColor: '#00bcd4',
    color: 'white',
    padding: '12px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  loading: {
    textAlign: 'center',
    marginTop: '3rem',
    color: '#666',
    fontSize: '1.2rem',
  },
};

export default EditLog;