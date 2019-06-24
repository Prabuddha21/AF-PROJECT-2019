import React from 'react';
import ReactDom from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import "../node_modules/font-awesome/css/font-awesome.min.css";

import AppComponent from './AppComponent';

ReactDom.render(<AppComponent/>, document.getElementById('root'));