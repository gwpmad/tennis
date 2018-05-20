import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './modules';
import App from './components/App';

const mountElement = document.querySelector('#mountpoint');
const store = createStore(
  reducer,
  undefined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const provider = <Provider store={store}><App /></Provider>;
ReactDOM.render(provider, mountElement);
