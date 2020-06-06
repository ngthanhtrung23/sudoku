import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Game from './components/Game';
import reducers from './reducers';
import './index.css';

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <Game />
    </Provider>,
    document.getElementById('root')
);
