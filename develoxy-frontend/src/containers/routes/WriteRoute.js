import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as header from 'redux/modules/base/header';

import Write, { Sidebar, Content, MarkdownEditor } from 'components/Write/Write';

class WriteRoute extends Component {
    
    componentWillMount() {
        // 헤더를 숨긴다
        const { HeaderActions } = this.props;
        HeaderActions.hideHeader();
    }

    componentWillUnmount() {
        // 헤더를 보여준다
        const { HeaderActions } = this.props;
        HeaderActions.showHeader();
    }
    
    
    render() {

        return (
            <Write>
                <Sidebar/>
                <Content>
                    <MarkdownEditor/>
                </Content>
            </Write>
        );
    }
}



WriteRoute = connect(
    state => ({
        status: {
            header: state.base.header
        }
    }),
    dispatch => ({
        HeaderActions: bindActionCreators(header, dispatch)
    })
)(WriteRoute);

export default WriteRoute;