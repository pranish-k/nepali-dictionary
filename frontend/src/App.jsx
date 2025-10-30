import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Submit from './pages/Submit';
import Word from './pages/Word';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/word/:id" element={<Word />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
