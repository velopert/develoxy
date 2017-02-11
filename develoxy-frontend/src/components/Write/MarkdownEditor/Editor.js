import React, { Component, PropTypes } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/theme/monokai.css';

import debounce from 'lodash/debounce';

class Editor extends Component {

    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.string
    }

    mirror = null
    editorInstance = null

    constructor(props) {
        super(props);
        this.handleChange = debounce(this.handleChange, 300);
    }
    handleChange = () => {
        console.log('뭐냐이거!');
        const { onChange } = this.props;
        
        onChange(this.editorInstance.getValue());
    }

    componentDidMount() {
        this.editorInstance = CodeMirror(this.mirror, {
            mode:  "markdown",
            lineNumbers: true,
            theme: 'monokai',
            lineWrapping: true,
        });
    }
    
    render() {
        const { handleChange } = this;

        return (
            <div className="editor-wrapper">
                <div className="editor">
                    <div className="mirror" ref={(ref) => { this.mirror = ref }}
                        onKeyUp={handleChange}
                    ></div>
                </div>
            </div>
        );
    }
}

export default Editor;