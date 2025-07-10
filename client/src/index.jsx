import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App.jsx";
import './input.css';
import './tailwind.css';
import './output.css';

console.log('CSS file imported');

const root = createRoot(document.getElementById('root'));
root.render(
<BrowserRouter> 
<App /> 
</BrowserRouter>);