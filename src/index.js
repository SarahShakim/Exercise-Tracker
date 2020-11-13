import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';//the starting point to create the front-end react app
import reportWebVitals from './reportWebVitals';

//renders the app that we loaded
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
