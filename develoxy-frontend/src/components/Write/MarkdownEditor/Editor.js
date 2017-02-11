import React, {Component} from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/theme/monokai.css';
class Editor extends Component {

    mirror = null
    editorInstance = null

    componentDidMount() {
        this.editorInstance = CodeMirror(this.mirror, {
            mode:  "markdown",
            lineNumbers: true,
            theme: 'monokai',
            lineWrapping: true,
        });
    }
    
    render() {
        return (
            <div className="editor-wrapper">
                <div className="editor">
                    <div className="mirror" ref={(ref) => { this.mirror = ref }}
                        onKeyPress={(e)=>{
                            console.log(e.key);
                        }}
                    ></div>
                </div>
            </div>
        );
    }
}

export default Editor;