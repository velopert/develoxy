import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modal from 'redux/modules/base/modal';
import * as authAction from 'redux/modules/base/auth';

// load components
import Header, {SidebarButton, BrandLogo, AuthButton} from 'components/Base/Header/Header';

import * as Modals from 'components/Base/Modals';
const { LoginModal, LinkAccountModal } = Modals;
const { SocialLoginButton } = LoginModal;

import auth from 'helpers/firebase/auth';
import users from 'helpers/firebase/database/users';


class App extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    profileRef = null

    componentDidMount() {

        // 계정 인증 리스너
        auth.authStateChanged(
            async (firebaseUser) => {
                if(this.profileRef) {
                    this.profileRef.off();
                    this.profileRef = null;
                }
                const { AuthActions } = this.props;
                
                if(firebaseUser) {
                    AuthActions.authenticate(firebaseUser);
                    this.profileRef = users.findProfileByIdSync(firebaseUser.uid, (snapshot) => {
                        // 내 프로필 업데이트
                        console.log(snapshot.val());
                    })

                    // // 유저 데이터가 존재하는지 확인
                    // const user = await users.findUserById(firebaseUser.uid);
                    // if(!user.exists()) {
                    //     // await users.createUserData(firebaseUser);
                    // }

                    // // const result = await users.findUserByUsername('velopert');
                    // console.log(result.val());
                } else {

                }
            }
        );

        // const exists = await users.checkUsernameExists('validatedfailure');
        // console.log(exists);

        
    }

    handleAuth = async (provider) => {

        const { handleModal } = this;

        handleModal.close('login');

        try {
            const loginData = await auth.signInWithPopup(provider);
            
            // 해당 유저가 가입되어있는지 체크한다
            // 리덕스에 넣는게 의미가 없으므로, 바로 사용한다
            const uid = loginData.user.uid;
            const profile = await users.findProfileById(uid);
            

            if(profile.exists()) {
               // 이미 가입한 유저다 
            } else {
                // 가입되지 않은 유저일 때
                this.context.router.push('/register');
            }
            

        } catch (e) {
            // 이미 존재하는 이메일일 경우 발생하는 에러
            if(e.code === 'auth/account-exists-with-different-credential') {
                // 계정 링크를 시도한다

                // 어떤 provider 로 가입되어있는지 알아낸다
                const existingProvider = await auth.getExistingProvider(e.email);

                // 모달을 보여준다, 링크할래? 하고
                handleModal.open({
                    modalName: 'linkAccount',
                    data: {
                        credential: e.credential,
                        provider,
                        existingProvider
                    }
                });

            }
        }
    }
    
    
    handleModal =(() => {
        const { ModalActions } = this.props;
        return {
            open: ({modalName, data}) => {
                ModalActions.openModal({modalName, data});
            },
            close: (modalName) => {
                ModalActions.closeModal(modalName);
            }
        }
    })()

    handleLinkAccount = async () => {
        const { status: { modal } } = this.props; 
        const credential = modal.getIn(['linkAccount', 'credential']);
        const provider = modal.getIn(['linkAccount', 'existingProvider']);
        const { handleModal } = this;

        console.log(credential, provider);
        await auth.linkAccount({credential, provider});
        handleModal.close('linkAccount')
        
    }

    render() {        
        const { children, status: {modal} } = this.props;
        const { handleAuth, handleModal, handleLinkAccount } = this;

        return (
            <div>
                <Header>
                    <SidebarButton/>
                    <BrandLogo/>
                    <AuthButton onClick={() => handleModal.open({modalName: 'login'})}/>
                </Header>
                
                <LoginModal visible={modal.getIn(['login', 'open'])} onHide={ () => handleModal.close('login')}>
                    <SocialLoginButton onClick={() => handleAuth('github')} type="github"/>
                    <SocialLoginButton onClick={() => handleAuth('google')} type="google"/>
                    <SocialLoginButton onClick={() => handleAuth('facebook')} type="facebook"/>
                </LoginModal>

                <LinkAccountModal 
                    visible={modal.getIn(['linkAccount', 'open'])} 
                    onHide={()=>handleModal.close('linkAccount')}
                    existingProvider={modal.getIn(['linkAccount', 'existingProvider'])}
                    provider={modal.getIn(['linkAccount', 'provider'])}
                    onLinkAccount={handleLinkAccount}
                />


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
        ModalActions: bindActionCreators(modal, dispatch),
        AuthActions: bindActionCreators(authAction, dispatch)
    })
)(App);

export default App;