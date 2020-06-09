import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import Game from './components/Game';
import './index.css';
import reducers from './reducers';


const store = createStore(
    reducers,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Route path="/:encoded?" component={Game} />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
