import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as header from 'redux/modules/base/header';
import * as write from 'redux/modules/write';

import Write, { Content, MarkdownEditor } from 'components/Write/Write';
import Sidebar, { 
    SwitchButton,
    ImageUploadButton,
    Box,
    TagInput,
    TagContainer
} from 'components/Write/Sidebar/Sidebar';

class WriteRoute extends Component {

    handleEditor = (() =>{
        const { WriteActions } = this.props;

        return {
            changeTitle: (title) => {
                WriteActions.changeTitle(title);
            },
            changeMarkdown: (markdown) => {
                WriteActions.changeMarkdown(markdown);
            },
            setFullscreen: (value) => {
                WriteActions.setFullscreen(value);
            },
            setScrollPercentage: (value) => {
                WriteActions.setScrollPercentage(value)
            },
            setIsLastLine: (value) => {
                WriteActions.setIsLastLine(value);
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
                <Sidebar>
                    <SwitchButton/>
                    <ImageUploadButton/>
                    <Box title="태그">
                        <TagInput/>
                        <TagContainer/>
                    </Box>
                    <Box title="공개 설정">


                    </Box>
                </Sidebar>
                <Content>
                    <MarkdownEditor
                        onChangeTitle={handleEditor.changeTitle}
                        onChangeMarkdown={handleEditor.changeMarkdown}
                        onSetFullscreen={handleEditor.setFullscreen}
                        onSetScrollPercentage={handleEditor.setScrollPercentage}
                        onSetIsLastLine={handleEditor.setIsLastLine}
                        title={write.getIn(['editor', 'title'])}
                        markdown={write.getIn(['editor', 'markdown'])}
                        fullscreen={write.getIn(['editor', 'fullscreen'])}
                        scrollPercentage={write.getIn(['editor', 'scrollPercentage'])}
                        isLastLine={write.getIn(['editor', 'isLastLine'])}
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