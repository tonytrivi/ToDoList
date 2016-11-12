//entry file
import React from 'react';
import { render } from 'react-dom';
import App from '../components/app';
import * as firebase from 'firebase';

//initialize firebase
var config = {
    apiKey: "AIzaSyB6lO8clXaEFbjIVuviyB9pboEMo6VUUJ8",
    authDomain: "react-firebase-qs.firebaseapp.com",
    databaseURL: "https://react-firebase-qs.firebaseio.com",
    storageBucket: "react-firebase-qs.appspot.com",
    messagingSenderId: "58155877491"
  };
firebase.initializeApp(config);

render(<App />, document.getElementById('app'));