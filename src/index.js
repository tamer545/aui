import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/compat/app";
import AuiList from "./AuiList";
import App from "./App";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDGHaXTkHxpHNJ4nQq1wVCfW4lR85CyMW8",
    authDomain: "automated-user-interface.firebaseapp.com",
    databaseURL: "https://automated-user-interface-default-rtdb.firebaseio.com/",
    projectId: "automated-user-interface",
    storageBucket: "automated-user-interface.appspot.com",
    messagingSenderId: "308927342878",
    appId: "1:308927342878:web:d11de4e037ae06795d410f",
    measurementId: "${config.measurementId}"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
