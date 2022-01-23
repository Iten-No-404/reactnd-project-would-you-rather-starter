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
      <Route exact path="/" element={<Home />} />
      <Route exact path="/add" element={<AddQuestion />} />
      <Route exact path="/leaderboard" element={<Leaderboard />} />
      <Route exact path="/questions/:question_id" element={<PollResults />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </Router>
  );
}

export default App;
