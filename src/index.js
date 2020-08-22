import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import store from './store';

import axios from 'axios';
axios.defaults.baseURL =  process.env.REACT_APP_BASE_API;

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

