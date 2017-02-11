import React, { Component, PropTypes } from 'react';

import * as ace from 'brace';
import 'brace/mode/markdown';
import 'brace/theme/monokai';


import throttle from 'lodash/throttle';

class Editor extends Component {

    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.string
    }

    editor = null

    constructor(props) {
        super(props);
        this.handleChange = throttle(this.handleChange, 500);
    }

    componentDidMount() {
        const editor = ace.edit('ace-editor');
        editor.getSession().setMode('ace/mode/markdown');
        editor.setTheme('ace/theme/monokai');
        editor.$blockScrolling = Infinity;
        this.editor = editor;
    }
    
    handleChange = (value) => {
        const { onChange } = this.props;        
        onChange(this.editor.getValue());
    }


    render() {
        const { handleChange } = this;
        const { value } = this.props;

        return (
            <div className="editor-wrapper">
                <div className="editor" id="ace-editor" onKeyUp={handleChange}>
                    
                </div>
            </div>
        );
    }
}

export default Editor;