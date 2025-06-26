/*import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SubjectForm from './components/SubjectForm';
import Dashboard from './components/Dashboard';
//import StudyPlanGenerator from './components/StudyPlanGenerator';
import ScheduleSuggestion from './components/ScheduleSuggestion';

const App = () => {
  const [subjects, setSubjects] = useState([]);

  const handleAddSubjects = (newSubjects) => {
    setSubjects([...subjects, ...newSubjects]);
  };

  return (
    
    <Router>

      <nav className="p-4 bg-gray-100">
        <Link to="/" className="mr-4">Add Subjects</Link>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
        <Link to="/study-plan" className="mr-4">Study Plan</Link>
        <Link to="/suggestion">Get Suggestion</Link>
      </nav>

      <div className="p-4">
        <Routes>
          <Route
            path="/"
            element={<SubjectForm onSubmit={handleAddSubjects} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard subjects={subjects} />}
          />
          <Route
            path="/suggestion"
            element={<ScheduleSuggestion />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
*/

/*
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SubjectForm from './components/SubjectForm';
import Dashboard from './components/Dashboard';
import ScheduleSuggestion from './components/ScheduleSuggestion';
import { Sun, Moon } from 'lucide-react';
import StudyPlanGenerator from './components/StudyPlanGenerator';
import Home from './components/Home';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';


const App = () => {
  const [subjects, setSubjects] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleAddSubjects = (newSubjects) => {
    setSubjects([...subjects, ...newSubjects]);
  };

  return (


    <Router>
      <nav className="p-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-between">
        <div className="space-x-4">


          <Link to="/addsub" className="text-black dark:text-white">Add Subjects</Link>
          <Link to="/dashboard" className="text-black dark:text-white">Dashboard</Link>
          <Link to="/study-plan" className="text-black dark:text-white">Study Plan</Link>
  


          <Link to="/suggestion" className="text-black dark:text-white">Get Motivation</Link>
        </div>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      <div className="p-4 bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
        <Routes>
                    <Route path="/" element={<Home />} />
          <Route path="/addsub" element={<SubjectForm onSubmit={handleAddSubjects} />} />
          <Route path="/dashboard" element={<Dashboard subjects={subjects} />} />
          <Route path="/study-plan" element={<StudyPlanGenerator />} />

          <Route path="/suggestion" element={<ScheduleSuggestion />} />
          
       
       <Route path="/login" element={<SignIn path="/login" routing="path" />} />
<Route path="/signup" element={<SignUp path="/signup" routing="path" />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
*/


/*
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SubjectForm from './components/SubjectForm';
import Dashboard from './components/Dashboard';
import ScheduleSuggestion from './components/ScheduleSuggestion';
import { Sun, Moon } from 'lucide-react';
import StudyPlanGenerator from './components/StudyPlanGenerator';
import Home from './components/Home';
import { SignedIn, SignedOut, SignIn, SignUp, SignInButton, UserButton } from '@clerk/clerk-react';

const App = () => {
  const [subjects, setSubjects] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleAddSubjects = (newSubjects) => {
    setSubjects([...subjects, ...newSubjects]);
  };

  return (
    <Router>
      <header className="p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-700">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <nav className="p-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-between">
        <div className="space-x-4">
          <Link to="/addsub" className="text-black dark:text-white">Add Subjects</Link>
          <Link to="/dashboard" className="text-black dark:text-white">Dashboard</Link>
          <Link to="/study-plan" className="text-black dark:text-white">Study Plan</Link>
          <Link to="/suggestion" className="text-black dark:text-white">Get Motivation</Link>
        </div>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      <div className="p-4 bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addsub" element={<SubjectForm onSubmit={handleAddSubjects} />} />
          <Route path="/dashboard" element={<Dashboard subjects={subjects} />} />
          <Route path="/study-plan" element={<StudyPlanGenerator />} />
          <Route path="/suggestion" element={<ScheduleSuggestion />} />
          <Route path="/login" element={<SignIn path="/login" routing="path" />} />
          <Route path="/signup" element={<SignUp path="/signup" routing="path" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
*/



/*

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SubjectForm from './components/SubjectForm';
import Dashboard from './components/Dashboard';
import ScheduleSuggestion from './components/ScheduleSuggestion';
import { Sun, Moon } from 'lucide-react';
import StudyPlanGenerator from './components/StudyPlanGenerator';
import Home from './components/Home';
import { SignedIn, SignedOut, SignIn, SignUp, UserButton } from '@clerk/clerk-react';

const App = () => {
  const [subjects, setSubjects] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleAddSubjects = (newSubjects) => {
    setSubjects([...subjects, ...newSubjects]);
  };

  return (
    <Router>
      <header className="p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-700">
        
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <nav className="p-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-between">
        <div className="space-x-4">
          <Link to="/addsub" className="text-black dark:text-white">Add Subjects</Link>
          <Link to="/dashboard" className="text-black dark:text-white">Dashboard</Link>
          <Link to="/study-plan" className="text-black dark:text-white">Study Plan</Link>
          <Link to="/suggestion" className="text-black dark:text-white">Get Motivation</Link>
        </div>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      <div className="p-4 bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addsub" element={<SubjectForm onSubmit={handleAddSubjects} />} />
          <Route path="/dashboard" element={<Dashboard subjects={subjects} />} />
          <Route path="/study-plan" element={<StudyPlanGenerator />} />
          <Route path="/suggestion" element={<ScheduleSuggestion />} />

          
          <Route path="/login" element={<SignIn routing="path" path="/login" />} />
          <Route path="/signup" element={<SignUp routing="path" path="/signup" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
*/



import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import SubjectForm from './components/SubjectForm';
import Dashboard from './components/Dashboard';
import ScheduleSuggestion from './components/ScheduleSuggestion';
import { Sun, Moon } from 'lucide-react';
import StudyPlanGenerator from './components/StudyPlanGenerator';
import Home from './components/Home';
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';

const App = () => {
  const [subjects, setSubjects] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleAddSubjects = (newSubjects) => {
    setSubjects([...subjects, ...newSubjects]);
  };

  return (
    <Router>
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-700">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      {/* Navigation: only visible when signed in */}
      <SignedIn>
        <nav className="p-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-between">
          <div className="space-x-4">
            <Link to="/addsub" className="text-black dark:text-white">
              Add Subjects
            </Link>
            <Link to="/dashboard" className="text-black dark:text-white">
              Dashboard
            </Link>
            <Link to="/study-plan" className="text-black dark:text-white">
              Study Plan
            </Link>
            <Link to="/suggestion" className="text-black dark:text-white">
              Get Motivation
            </Link>
          </div>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </SignedIn>

      {/* Main Content */}
      <div className="p-4 bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* ✅ Protected Routes when Signed In */}
          <Route
            path="/addsub"
            element={
              <SignedIn>
                <SubjectForm onSubmit={handleAddSubjects} />
              </SignedIn>
            }
          />
          <Route
            path="/dashboard"
            element={
              <SignedIn>
                <Dashboard subjects={subjects} />
              </SignedIn>
            }
          />
          <Route
            path="/study-plan"
            element={
              <SignedIn>
                <StudyPlanGenerator />
              </SignedIn>
            }
          />
          <Route
            path="/suggestion"
            element={
              <SignedIn>
                <ScheduleSuggestion />
              </SignedIn>
            }
          />

          {/* 🔁 Redirect if Signed Out */}
          <Route
            path="/addsub"
            element={
              <SignedOut>
                <Navigate to="/login" />
              </SignedOut>
            }
          />
          <Route
            path="/dashboard"
            element={
              <SignedOut>
                <Navigate to="/login" />
              </SignedOut>
            }
          />
          <Route
            path="/study-plan"
            element={
              <SignedOut>
                <Navigate to="/login" />
              </SignedOut>
            }
          />
          <Route
            path="/suggestion"
            element={
              <SignedOut>
                <Navigate to="/login" />
              </SignedOut>
            }
          />

          {/* Clerk Auth Pages */}
          <Route path="/login" element={<SignIn routing="path" path="/login" />} />
          <Route path="/signup" element={<SignUp routing="path" path="/signup" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
