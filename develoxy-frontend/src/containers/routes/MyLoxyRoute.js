import React, { Component } from 'react';

// Redux 관련 코드
import * as headerActions from 'redux/modules/base/header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// MyLoxy 관련 컴포넌트 로딩
import MyLoxy from 'components/MyLoxy';


class MyLoxyRoute extends Component {

    componentDidMount() {
        // 마운트 시 헤더를 숨긴다
        const { HeaderActions } = this.props;
        HeaderActions.hideHeader();
    }

    componentWillUnmount() {
        // 다른 페이지로 이동 할 때 헤더를 다시 보여준다
        const { HeaderActions } = this.props;
        HeaderActions.showHeader();
    }
    
    
    render() {
        return (
            <MyLoxy>
                dmdkdkdk
            </MyLoxy>
        );
    }
}

MyLoxyRoute = connect(
    state => ({
        status: {}
    }),
    dispatch => ({
        // Actions: bindActionCreators(actions, dispatch)
        HeaderActions: bindActionCreators(headerActions, dispatch)
    })
)(MyLoxyRoute);

export default MyLoxyRoute;