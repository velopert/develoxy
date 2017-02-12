import React, {Component, PropTypes} from 'react';
import TitleInput from './TitleInput';
import ContentBody from './ContentBody';
import Editor from './Editor';
import Preview from './Preview';

class MarkdownEditor extends Component {

    static propTypes = {
        onChangeTitle: PropTypes.func,
        onChangeMarkdown: PropTypes.func,
        onSetFullscreen: PropTypes.func,
        onSetScrollPercentage: PropTypes.func,
        onSetIsLastLine: PropTypes.func,
        title: PropTypes.string,
        markdown: PropTypes.string,
        fullscreen: PropTypes.bool,
        scrollPercentage: PropTypes.number,
        isLastLine: PropTypes.bool
        // ...
    }

    render() {
        const { 
            onChangeTitle, 
            onChangeMarkdown, 
            onSetFullscreen,
            onSetScrollPercentage,
            onSetIsLastLine,
            title, 
            markdown, 
            fullscreen,
            scrollPercentage,
            isLastLine
        } = this.props;

        return (
            <div className="markdown-editor">
                <TitleInput onChange={onChangeTitle}/>
                <ContentBody>
                    <Editor 
                        onChange={onChangeMarkdown} 
                        onSetFullscreen={onSetFullscreen}
                        onSetScrollPercentage={onSetScrollPercentage}
                        onSetIsLastLine={onSetIsLastLine}
                        value={markdown} 
                        fullscreen={fullscreen}
                    />
                    <Preview 
                        title={title} 
                        markdown={markdown} 
                        scrollPercentage={scrollPercentage}
                        isLastLine={isLastLine}
                    />
                </ContentBody>
            </div>
        );
    }
}


export default MarkdownEditor;