import React, { Component } from 'react';
import axios from 'axios';
import storage from 'helpers/storage';
import * as user from 'redux/modules/base/user';
import * as modal from 'redux/modules/base/modal';
import * as register from 'redux/modules/register';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';

import { Loader } from 'semantic-ui-react';

class CallbackRoute extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    componentWillMount() {   
        this.handleCallback();
    }

    handleCallback = async () => {
        const { location: {query} } = this.props;

        // 쿼리 데이터 제대로 안받은경우 그냥 메인페이지로 이동

        if(!query) {
            this.context.router.push('/');
        }

        if(!query.token) {
            this.context.router.push('/');
        }

        const token = query.token;


        axios.defaults.headers.common['x-access-token'] = token;

        if(query.register) {
            storage.set('tempToken', token);
            this.context.router.push('/register');  
        } 

        const { UserActions, ModalActions, RegisterActions } = this.props;

        if(query.valid) {
            storage.set('token', token); 
            const thumbnail = query.thumbnail === "null" ? null : query.thumbnail;
            const decoded = jwtDecode(token);
            
            const { displayName, username, userId } = decoded.data;

            const profile = {
                userId,
                displayName,
                username,
                thumbnail
            };

            // 스토어에 저장
            UserActions.setUserInfo(profile);


            // 연동 할 계정이 있는지 체크
            const integrateToken = storage.get('integrateToken');
            if(integrateToken) {
                storage.remove('integrateToken');
                try {
                    await RegisterActions.linkAccount(integrateToken);
                }
                catch(e) {
                    // TODO: LINK 실패
                }
                this.context.router.push('/');
                return;
            }


            // 로컬스토리지에 저장
            storage.set('profile', profile);

            this.context.router.push('/');
            // TODO: 마지막으로 보던 페이지로 이동
        }

        if(query.integrate) {
            // 연동할 토큰 스토어에 넣기
            const { provider, existingProvider, email } = query;
            this.context.router.push('/');
            ModalActions.openModal({
                modalName: 'linkAccount',
                data: {
                    token,
                    provider,
                    existingProvider,
                    email
                }
            });
        }
    }
    

    render() {
        const { location: {query}, status } = this.props;
        return status.linking ? <Loader active size="massive"/> : null;
    }
}

CallbackRoute = connect(
    state => ({
        status: {
            linking: state.register.getIn('pending', 'linkAccount')
        }
    }),
    dispatch => ({
        UserActions: bindActionCreators(user, dispatch),
        ModalActions: bindActionCreators(modal, dispatch),
        RegisterActions: bindActionCreators(register, dispatch)
    })
)(CallbackRoute);

export default CallbackRoute;

