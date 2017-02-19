import React, { Component } from 'react';
import axios from 'axios';
import storage from 'helpers/storage';
import * as user from 'redux/modules/base/user';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';

class CallbackRoute extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    componentWillMount() {
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

            const { UserActions } = this.props;

            // 스토어에 저장
            UserActions.setUserInfo(profile);

            // 로컬스토리지에 저장
            storage.set('profile', profile);

            this.context.router.push('/');
            // TODO: 마지막으로 보던 페이지로 이동
        }

    }
    

    render() {
        const { location: {query} } = this.props;

        return null;
    }
}

CallbackRoute = connect(
    state => ({
    }),
    dispatch => ({
        UserActions: bindActionCreators(user, dispatch)
    })
)(CallbackRoute);

export default CallbackRoute;

