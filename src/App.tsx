import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Row, Col, Toast} from 'react-bootstrap';
import { getDeviceToken, onMessageListener } from './firebase';


function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body:''});

  getDeviceToken();

  onMessageListener().then(payload => {
    setShow(true);
    setNotification({title:payload.notification?.title??"", body: payload.notification?.body??""})
    console.log(payload);
  }).catch(err => console.log('failed: ', err));


  return (
    <div className="App">
    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">{notification.title}</strong>
            <small>12 mins ago</small>
          </Toast.Header>
          <Toast.Body>{notification.body}</Toast.Body>
        </Toast>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button onClick={() => setShow(true)}>Show Toast</Button>
      </header>
    </div>
  );
}

export default App;
function payload(value: unknown): String | PromiseLike<String> {
  throw new Error('Function not implemented.');
}

