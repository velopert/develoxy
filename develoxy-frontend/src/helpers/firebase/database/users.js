import * as firebase from 'firebase';

export function findUserById(uid) {
    return firebase.database().ref('/users/' + uid).once('value');
}

export function createUserData(user) {
    const { uid, email, photoURL, displayName} = user;
    return firebase.database().ref('users/' + uid).set({
        email,
        photoURL, 
        displayName
    });
}

// export function updateProviderData({uid, providerData}) {
//     const updates = {
//         ['users/' + uid + '/providerData']: providerData
//     };
//     return firebase.database().ref().update(updates);
// }