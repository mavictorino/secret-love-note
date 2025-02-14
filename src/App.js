import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteForm from './components/NoteForm';
import NoteCreated from './components/NoteCreated';
import ViewNote from './pages/ViewNote';
import { initHeartCursor } from './components/HeartCursor';
import { ToastContainer } from "react-toastify";

import { useState, useEffect } from 'react';

import './App.css';

function App() {

  const [noteId, setNoteId] = useState(null);

  useEffect(() => {
    initHeartCursor();
  }, []);

  return (

    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/' element={!noteId ? <NoteForm onNoteCreated={setNoteId} /> : <NoteCreated noteId={noteId} />} />
        <Route path='/note/:id' element={<ViewNote />} />
      </Routes>
    </Router>
  )

}

export default App;
