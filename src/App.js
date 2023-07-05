import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import SongDisplay from './SongDisplay';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ImageUpload />} />
                <Route path="/song" element={<SongDisplay />} />
            </Routes>
        </Router>
    );
}

export default App;



