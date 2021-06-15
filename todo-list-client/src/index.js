import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppContainer } from 'react-hot-loader';

import './index.css';
import DevTools from './config/devtools';
import initStore from './config/store';
import setupAxiosInterceptors from './config/axios-interceptor';
import AppComponent from './app';
import registerServiceWorker from './registerServiceWorker';


const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const store = initStore();

const actions = bindActionCreators({}, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));

const rootEl = document.getElementById('root');

const render = Component =>
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <div>
                    {devTools}
                    <Component/>
                </div>
            </Provider>
        </AppContainer>,
        rootEl);

render(AppComponent);

registerServiceWorker();
