import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import 'isomorphic-fetch';

ReactDOM.render(<App />, document.getElementById('app'));
