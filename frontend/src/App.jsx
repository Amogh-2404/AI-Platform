import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TextGenerator from './components/TextGenerator';
import SentimentAnalyzer from './components/SentimentAnalyzer';
import Auth from './components/Auth';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          <Route path="/" element={<TextGenerator />} />
          <Route path="/sentiment" element={<SentimentAnalyzer />} />
          <Route path="/auth/*" element={<Auth />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;