import React, { Component } from 'react';
import axios from 'axios';
import storage from 'helpers/storage';


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

        axios.defaults.headers.common['x-access-token'] = query.token;

        if(query.register) {
            storage.set('tempToken', query.token);
            this.context.router.push('/register');  
        } else {
            storage.set('token', query.token);  
            // TODO: 토큰 디코딩 후 스토어에 넣기
        }

    }
    

    render() {
        const { location: {query} } = this.props;

        return null;
    }
}

export default CallbackRoute;