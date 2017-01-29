import * as firebase from 'firebase';

const auth = (function() {

    const providers = {
        github: (new firebase.auth.GithubAuthProvider()),
        google: (new firebase.auth.GoogleAuthProvider()),
        facebook: (new firebase.auth.FacebookAuthProvider())
    };

    return {
        github: () => {
            return firebase.auth().signInWithPopup(providers.github);
        },
        google: () => {
            return firebase.auth().signInWithPopup(providers.google);
        },
        facebook: () => {
            return firebase.auth().signInWithPopup(providers.facebook);
        },
        logout: () => {
            return firebase.auth().signOut()
        },
        getExistingProvider: async (email) => {
            const existingProviders = await firebase.auth().fetchProvidersForEmail(email);
            const provider = existingProviders[0].split('.')[0];
            return provider;
        },
        linkAccount: async ({provider, credential}) => {
            const result = await firebase.auth().signInWithPopup(providers[provider]);
            return result.user.link(credential);
        },
        resolveDuplicate: async (error) => {
            const { credential, email } = error;
            const existingProviders = await firebase.auth().fetchProvidersForEmail(email);
            // 비밀번호를 사용하여 인증하는 경우는 없으니, 소셜 계정을 사용하는거로 간주 (당연히)        
            const provider = existingProviders[0].split('.')[0];
            const result = await firebase.auth().signInWithPopup(providers[provider]);
            return result.user.link(credential);
        },
        authStateChanged: (callback) => {
            // 콜백은 firebaseUser 를 파라미터로 받음
            firebase.auth().onAuthStateChanged(callback)
        }
    }
})();

export default auth;