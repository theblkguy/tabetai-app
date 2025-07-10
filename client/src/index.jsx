import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App.jsx";
<<<<<<< HEAD
import './input.css';
=======
import './tailwind.css';
import './output.css';
>>>>>>> a1537dcc7bc74899ff02649a3707c0a3b9b6ebc4

console.log('CSS file imported');

const root = createRoot(document.getElementById('root'));
root.render(
<BrowserRouter> 
<App /> 
</BrowserRouter>);