import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'containers/Root';
import { browserHistory } from 'react-router';

import firebase from 'firebase';
import firebaseConfig from '../config/firebase';

// redux
import configureStore from 'redux/configureStore';


firebase.initializeApp(firebaseConfig);

const store = configureStore();


const rootElement = document.getElementById('root');


ReactDOM.render(
    <Root store={store} history={browserHistory}/>, rootElement
);
// ReactDOM.render(
//     <AppContainer><Root store={store} history={browserHistory}/></AppContainer>, rootElement
// )


// if(module.hot) {

//     /**
//      * Warning from React Router, caused by react-hot-loader.
//      * The warning can be safely ignored, so filter it from the console.
//      * Otherwise you'll see it every time something changes.
//      * See https://github.com/gaearon/react-hot-loader/issues/298
//      */
    
//     const orgError = console.error;
//     console.error = (...args) => {
//         if (args && args[0] && typeof args[0] === 'string' &&
//             args[0].indexOf('You cannot change <Router routes>;') > -1) {
//             // React route changed
//         } else {
//             // Log the error as normal
//             orgError.apply(console, args);
//         }
//     };

//     module.hot.accept('./containers/Root', () => {
//         const NextRoot = require('./containers/Root').default;
//         ReactDOM.render(
//             <AppContainer>
//                 <NextRoot store={store} history={browserHistory}/>
//             </AppContainer>, rootElement
//         )
//     })
// }
