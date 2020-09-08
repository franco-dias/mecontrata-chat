import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Window, AppContainer } from './style';
import './global.css';


ReactDOM.render(
  <React.StrictMode>
    <Window>
      <AppContainer>
        <App />
      </AppContainer>
    </Window>
  </React.StrictMode>,
  document.getElementById('root')
);
