import React, {Component} from 'react';
import TitleInput from './TitleInput';

class MarkdownEditor extends Component {
    render() {
        return (
            <div className="markdown-editor">
                <TitleInput/>
            </div>
        );
    }
}

export default MarkdownEditor;