import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
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
    <AppContainer><Root store={store} history={browserHistory}/></AppContainer>, rootElement
)


if(module.hot) {
    module.hot.accept('./containers/Root', () => {
        const NextRoot = require('./containers/Root').default;
        ReactDOM.render(
            <AppContainer>
                <NextRoot store={store} history={browserHistory}/>
            </AppContainer>, rootElement
        )
    })
}


// import React from 'react';
// import ReactDOM from 'react-dom';
// import { AppContainer } from 'react-hot-loader'
// import { Provider } from 'react-redux';

// import firebase from 'firebase';
// import firebaseConfig from '../config/firebase';


// import Root from 'containers/Root';
// import Routes from 'containers/Routes';
// import App from 'containers/App';

// // redux
// import configureStore from 'redux/configureStore';

// firebase.initializeApp(firebaseConfig);

// const store = configureStore();
// const rootElement = document.getElementById('root');


// ReactDOM.render(
//     <AppContainer>
//         <App/>
//     </AppContainer>, rootElement
// )

// if(module.hot) {
//     module.hot.accept('./containers/App', () => {
//         const NextApp = require('./containers/App').default;
//         ReactDOM.render(
//             <AppContainer>
//                 <NextApp/>
//             </AppContainer>, rootElement
//         )
//     })
// }

// // ReactDOM.render(
// //     (
// //     <AppContainer>
// //         <Root store={store}/>
// //     </AppContainer>
// //     ), rootElement
// // );

// // if(module.hot) {
// //     module.hot.accept('./containers/Root', () => {
// //         const NextRoot = require('./containers/Root').default;
// //         ReactDOM.render(
// //             <AppContainer>
// //                 <NextRoot store={store}/>
// //             </AppContainer>, rootElement
// //         );
// //     })
// // }