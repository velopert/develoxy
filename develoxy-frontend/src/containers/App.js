import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modal from 'redux/modules/base/modal'
// // load components
import Header, {SidebarButton, BrandLogo, AuthButton} from 'components/Base/Header/Header';
import LoginModal, { SocialLoginButton } from 'components/Base/LoginModal/LoginModal';
import auth from 'helpers/firebase/auth';


class App extends Component {


    componentDidMount() {
        auth.authStateChanged(
            (firebaseUser) => {
                if(firebaseUser) {
                    console.log('로그인이 됐다요', firebaseUser);
                } else {
                    console.log('로그인 안됐는데? 어쩔건데?')
                }
            }
        );
    }

    handleAuth = (provider) => {
        auth[provider]().catch(
            error => {
                if(error.code === 'auth/account-exists-with-different-credential') {
                    auth.resolveDuplicate(error);
                }
            }
        );
    }
    

    handleLoginModal = (() => {
        const { ModalActions } = this.props;
        return {
            open: () => {
                ModalActions.openModal({modalName: 'login'});
            },
            close: () => {
                ModalActions.closeModal('login');
            }
        }
    })()

    render() {        
        const { children, status: {modal} } = this.props;
        const { handleLoginModal, handleAuth } = this;

        return (
            <div>
                <Header>
                    <SidebarButton/>
                    <BrandLogo/>
                    <AuthButton onClick={handleLoginModal.open}/>
                </Header>
                <LoginModal visible={modal.getIn(['login', 'open'])} onHide={handleLoginModal.close}>
                    <SocialLoginButton onClick={() => handleAuth('github')} type="github"/>
                    <SocialLoginButton onClick={() => handleAuth('google')} type="google"/>
                    <SocialLoginButton onClick={() => handleAuth('facebook')} type="facebook"/>
                </LoginModal>
                {children}
            </div>
        );
    }
}

App = connect(
    state => ({
        status: {
            modal: state.base.modal
            // something: state.something.get('something')
        }
    }),
    dispatch => ({
        ModalActions: bindActionCreators(modal, dispatch)
    })
)(App);

export default App;