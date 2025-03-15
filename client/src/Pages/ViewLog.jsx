import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ViewLog = () => {
  const { id } = useParams();
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const res = await fetch(`/api/logs/${id}`);
        const data = await res.json();
        if (!data.error) {
          setLog(data);
        }
      } catch (err) {
        console.error("Failed to fetch log:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLog();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>;
  if (!log) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Log not found!</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{log.title}</h2>
        <p style={styles.experience}>{log.experience}</p>
        <small style={styles.date}>
          <strong>Date:</strong> {new Date(log.date).toLocaleString()}
        </small>
        <div style={styles.buttons}>
          <Link to="/dashboard" style={styles.button}>← Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#f0faff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    width: "100%",
  },
  title: {
    fontSize: "2rem",
    color: "#0099cc",
    marginBottom: "1rem",
  },
  experience: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    marginBottom: "1rem",
    color: "#333",
  },
  date: {
    display: "block",
    marginBottom: "1.5rem",
    color: "#666",
  },
  buttons: {
    display: "flex",
    gap: "10px",
  },
  button: {
    backgroundColor: "#00bcd4",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "0.2s",
  },
};

export default ViewLog;
