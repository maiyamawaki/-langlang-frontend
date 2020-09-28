import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import * as serviceWorker from './serviceWorker';
import OurProvider from "./context"
import HeaderBar from "./components/HeaderBar"

ReactDOM.render(
<OurProvider>
<HeaderBar />
<Router>
</Router>
</OurProvider>,
document.getElementById('root'));

serviceWorker.unregister();
