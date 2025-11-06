import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from "axios";

axios.get("https://jsonplaceholder.typicode.com/todos/1")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error("Error:", error);
  });


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
