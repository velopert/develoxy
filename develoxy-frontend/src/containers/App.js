import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modal from 'redux/modules/base/modal';
import * as authAction from 'redux/modules/base/auth';
import * as header from 'redux/modules/base/header';
import environment from 'environment';

// load components
import Header, {SidebarButton, BrandLogo, AuthButton, UserButton, UserMenu } from 'components/Base/Header/Header';

import * as Modals from 'components/Base/Modals';
const { LoginModal, LinkAccountModal } = Modals;
const { SocialLoginButton } = LoginModal;

// import auth from 'helpers/firebase/auth';
// import users from 'helpers/firebase/database/users';

import storage from 'helpers/storage';

class App extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    profileRef = null


    
    componentWillMount() {
        // 프로필을 임시로 불러온다
        const { AuthActions } = this.props;
        const profile = storage.get('profile');

        if(profile) {
            AuthActions.syncProfile(profile);
        }
    }
    

    componentDidMount() {
        // storage.remove('profile');
        // auth.logout();
        // 계정 인증 리스너
        // auth.authStateChanged(
        //     async (firebaseUser) => {

        //         // 기존 프로필 동기화 중지
        //         if(this.profileRef) {
        //             this.profileRef.off();
        //             this.profileRef = null;
        //         }
        //         const { AuthActions } = this.props;
                
        //         if(firebaseUser) {
        //             AuthActions.authenticate(firebaseUser);
        //             this.profileRef = users.findProfileByIdSync(firebaseUser.uid, (snapshot) => {
                        
        //                 const profile = snapshot.val();

        //                 // 내 프로필 동기화
        //                 AuthActions.syncProfile(profile);
                        
        //                 // 만약에, profile 이 valid 하면, 그 정보를 localStorage 에 넣는다.
        //                 storage.set('profile', profile);
                        
        //             })
        //         } else {

        //         }
        //     }
        // );

        // const exists = await users.checkUsernameExists('validatedfailure');
        // console.log(exists);

        
    }

    handleAuth = (provider) => {
        // 주어진 provider 로그인 페이지로 이동
        location.href = `${environment.backendUrl}/api/auth/login/${provider}`
    }
    
    
    handleModal = (() => {
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

    handleUserMenu = (() => {
        const { HeaderActions } = this.props;
        return {
            open: () => {
                HeaderActions.openUserMenu();
            },
            close: () => {
                HeaderActions.closeUserMenu();
            }
        }
    })()

    handleLinkAccount = async () => {
        // const { status: { modal } } = this.props; 
        // const credential = modal.getIn(['linkAccount', 'credential']);
        // const provider = modal.getIn(['linkAccount', 'existingProvider']);
        // const { handleModal } = this;


        // console.log(credential, provider);
        // await auth.linkAccoopenUserMenuunt({credential, provider});
        // handleModal.close('linkAccount')
        
    }

    render() {        
        const { children, status: { modal,profile, header } } = this.props;
        const { handleAuth, handleModal, handleLinkAccount, handleUserMenu } = this;

        return (
            <div>
                <Header visible={header.get('visible')}>
                    <SidebarButton/>
                    <BrandLogo/>

                    {   
                        profile.get('username') 
                        ?  <UserButton thumbnail={profile.get('thumbnail')} onClick={handleUserMenu.open}/>
                        :  <AuthButton onClick={() => handleModal.open({modalName: 'login'})}/>
                    }

                    <UserMenu visible={header.getIn(['userMenu', 'open'])} onHide={handleUserMenu.close}/>
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
            header: state.base.header,
            modal: state.base.modal,
            profile: state.base.auth.get('profile')
            // something: state.something.get('something')
        }
    }),
    dispatch => ({
        ModalActions: bindActionCreators(modal, dispatch),
        AuthActions: bindActionCreators(authAction, dispatch),
        HeaderActions: bindActionCreators(header, dispatch)
    })
)(App);

export default App;