import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Auth from './pages/auth';
import Navbar from './components/navbar/Navbar';
import Portfolio from './pages/portfolio/portfolio';

function App() {
  return (
    <div className="App">
      <Router>  

        <div className='app__navbar'>
          <Navbar />
        </div>  
        {/* <div className='app__body'>
          <div className='app__container'> */}
            <Routes>        
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} /> 
                <Route path="/portfolio" element={<Portfolio />} />         
            </Routes>
          {/* </div>         
        </div>  */}
      </Router>
    </div>
  );
}

export default App;
