// App.js
import React, { useState } from 'react';
import StudentView from './StudentView';
import MentorView from './MentorView';

function App() {
  const [selectedView, setSelectedView] = useState('student'); // Default to Student View

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          CBIT
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className={`nav-item ${selectedView === 'student' ? 'active' : ''}`}>
              <a
                className="nav-link"
                href="#"
                onClick={() => setSelectedView('student')}
              >
                Student View
              </a>
            </li>
            <li className={`nav-item ${selectedView === 'mentor' ? 'active' : ''}`}>
              <a
                className="nav-link"
                href="#"
                onClick={() => setSelectedView('mentor')}
              >
                Mentor View
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {selectedView === 'student' ? <StudentView /> : <MentorView />}
    </div>
  );
}

export default App;
