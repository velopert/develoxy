import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';


// redux
import configureStore from 'redux/configureStore';

const store = configureStore();

const rootElement = document.getElementById('root');

const render = Component =>
    ReactDOM.render(
        <AppContainer>
            <Component store={store}/>
        </AppContainer>,
    rootElement
);


window.onload = function () {
    render(Root);
}

if (module.hot) module.hot.accept('./containers/Root', () => render(Root));