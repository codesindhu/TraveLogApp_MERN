import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to TraveLogApp 🌍</h1>
      <p style={styles.subtext}>Your journey deserves to be remembered!</p>
      <Link to="/dashboard" style={styles.button}>Go to Dashboard</Link>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',  // Vertically center
    alignItems: 'center',      // Horizontally center
    background: '#e6f7ff',
    padding: '2rem',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#0099cc',
    marginBottom: '1rem',
  },
  subtext: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    color: '#333',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1.1rem',
    backgroundColor: '#00bcd4',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    textDecoration: 'none',
    cursor: 'pointer',
  }
};

export default Landing;
