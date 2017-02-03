import * as firebase from 'firebase';
import config from './config';

import authHelper from './auth';

// firebase 를 프로젝트에서 조금 더 쉽게 사용하기 위한 헬퍼

const firebaseHelper = (
    () => {
        return {
            initialize: () => {
                // initialize firebase
                firebase.initializeApp(config);

                // initialize the helpers
                const auth = firebase.auth();
                const database = firebase.database();
                
                authHelper.initialize(auth);
            }
        }
    }
)();

export default firebaseHelper;