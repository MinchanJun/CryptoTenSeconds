import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import store from './store';
import './styles.css';

ReactDOM.render(
<Provider store={store}><App/></Provider>, 
document.getElementById('app')
);

