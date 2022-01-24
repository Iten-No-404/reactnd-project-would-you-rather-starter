import React/*, {Component}*/ from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Leaderboard from './components/Leaderboard';
import AddQuestion from './components/AddQuestion';
import PollResults from './components/PollResults';
import NotFound from './components/NotFound';


function App() {
  return (
    <Router>
      <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddQuestion />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/questions/:question_id" element={<PollResults />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </Router>
  );
}

export default App;
