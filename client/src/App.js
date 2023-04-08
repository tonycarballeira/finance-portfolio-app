import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Auth from './pages/auth';
import Navbar from './compoments/navbar';

function App() {
  return (
    <div className="App">
      <Router>  
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
