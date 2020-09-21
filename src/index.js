import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App/App';

import './pages/index.css';

ReactDOM.render(
<Router>
<App />
</Router>
, document.querySelector('.page__content'))