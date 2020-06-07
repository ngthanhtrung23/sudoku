import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Game from './components/Game';
import './index.css';
import reducers from './reducers';



ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <Game />
    </Provider>,
    document.getElementById('root')
);
