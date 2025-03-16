import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing';
import Dashboard from './Pages/Dashboard';
import ViewLog from './Pages/ViewLog';
import EditLog from './Pages/EditLog';
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
