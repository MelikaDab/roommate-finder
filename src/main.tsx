import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Sidebar from './components/Sidebar.jsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <BrowserRouter>
    <StrictMode>
      {/* <Sidebar className="flex-1"/> */}
      <App />
    </StrictMode>
  </BrowserRouter>
)
