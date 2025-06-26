/*import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'flowbite'; // Import Flowbite's JavaScript for interactive components
import { ClerkProvider } from '@clerk/clerk-react';

const root = createRoot(document.getElementById('root'));
const clerk_key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

console.log(clerk_key);
if (!clerk_key) {
  throw new Error("key was not found");
}

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerk_key}> 
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
*/
/*
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'flowbite';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const root = createRoot(document.getElementById('root'));
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)
  */


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk publishable key.");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
