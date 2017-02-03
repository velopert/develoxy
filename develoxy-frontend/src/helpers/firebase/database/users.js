// usersHelper 는 users 와 userSettings 를 담당한다
const usersHelper = (() => {
    let users = null;
    return {
        // 헬퍼 initialize
        initialize: (database) => {
            users = users.ref('/users/');
        },

        /* 탐색 */

        // 프로필 찾기
        findProfileById: (uid) => {
            return users.child('profiles').child(uid).once('value');
        },

        // 계정 설정 찾기
        findSettingById: (uid) => {
            return users.child('settings').child(uid).once('value');
        },

        findProfileByUsername: (username) => {
            return users.child('settings').orderByChild('username')
                                          .equalTo(username);
        },

        /* 수정 */

        /* 생성 */

        // 유저 생성
        create: ({uid, username, displayName, email, thumbnail}) => {
            const profile = users.child('profiles').child(uid).set({
                username,
                displayName,
                thumbnail
            });

            const setting = users.child('settings').child('uid').set({
                email
                // 나중에 더 추가 할 것임
            });

            return Promise.all([profile, setting]);
        }
    }
})();

export default usersHelper;



// import * as firebase from 'firebase';

// export function findUserById(uid) {
//     return firebase.database().ref('/users/' + uid).once('value');
// }

// export function findUserByUsername(username) {
//     const ref = firebase.database().ref('/users/')
//     return ref.orderByChild('username').equalTo(username).once('child_added')
// }

// export function createUserData({user, username}) {
//     const { uid, email, photoURL, displayName} = user;
//     return firebase.database().ref('users/' + uid).set({
//         email,
//         photoURL, 
//         displayName,
//         username
//     });
// }

// // export function updateProviderData({uid, providerData}) {
// //     const updates = {
// //         ['users/' + uid + '/providerData']: providerData
// //     };
// //     return firebase.database().ref().update(updates);
// // }