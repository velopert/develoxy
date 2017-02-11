import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as header from 'redux/modules/base/header';
import * as write from 'redux/modules/write';

import Write, { Sidebar, Content, MarkdownEditor } from 'components/Write/Write';

class WriteRoute extends Component {

    handleEditor = (() =>{
        const { WriteActions } = this.props;

        return {
            changeTitle: (title) => {
                
                WriteActions.changeTitle(title);
            },
            changeMarkdown: (markdown) => {
                WriteActions.changeMarkdown(markdown);
            }
        }
    })()

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

        const { handleEditor } = this;
        const { status: { write } } = this.props;

        return (
            <Write>
                <Sidebar/>
                <Content>
                    <MarkdownEditor
                        onChangeTitle={handleEditor.changeTitle}
                        onChangeMarkdown={handleEditor.changeMarkdown}
                        title={write.getIn(['editor', 'title'])}
                        markdown={write.getIn(['editor', 'markdown'])}
                    />
                </Content>
            </Write>
        );
    }
}



WriteRoute = connect(
    state => ({
        status: {
            header: state.base.header,
            write: state.write
        }
    }),
    dispatch => ({
        HeaderActions: bindActionCreators(header, dispatch),
        WriteActions: bindActionCreators(write, dispatch)
    })
)(WriteRoute);

export default WriteRoute;