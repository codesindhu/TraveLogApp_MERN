import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ViewLog from './pages/ViewLog';
import EditLog from './pages/EditLog';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/log/:id" element={<ViewLog />} />
        <Route path="/log/:id/edit" element={<EditLog />} />
      </Routes>
    </Router>
  );
}

export default App;
