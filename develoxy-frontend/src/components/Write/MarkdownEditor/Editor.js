import React, { Component, PropTypes } from 'react';
import FullScreenToggler from './FullScreenToggler';

import * as ace from 'brace';
import 'brace/mode/markdown';
import 'brace/theme/monokai';


import throttle from 'lodash/throttle';

class Editor extends Component {

    static propTypes = {
        onChange: PropTypes.func,
        onSetFullscreen: PropTypes.func,
        onSetIsLastLine: PropTypes.func,
        value: PropTypes.string,
        fullscreen: PropTypes.bool
    }

    editor = null
    lastEditedRow = -1

    constructor(props) {
        super(props);
        this.handleChange = throttle(this.handleChange, 200);
        this.handleSetScrollPercentage = throttle(this.handleSetScrollPercentage, 100);
    }

    componentDidMount() {
        this.initializeEditor();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.fullscreen !== this.props.fullscreen) {
            this.initializeEditor();
        }
    }

    componentWillUnmount() {
        this.editor.getSession().removeAllListeners('changeScrollTop');
    }
    
    

    initializeEditor = () => {
        const { value } = this.props;

        const editor = ace.edit('ace-editor');
        const session = editor.getSession();

        window.editor = editor;
        window.session = session;

        session.setMode('ace/mode/markdown');
        session.setUseWrapMode(true);
        editor.setTheme('ace/theme/monokai');
        editor.$blockScrolling = Infinity;
        editor.setShowPrintMargin(false);
        editor.renderer.setShowGutter(false);
        editor.setValue(value, 1);

        const sc = document.getElementsByClassName('ace_scrollbar-inner')[0];

        const { handleSetScrollPercentage } = this;

        // 스크롤 이벤트 리스너
        if(!this.editor) {
            session.on('changeScrollTop', function(scroll){
                handleSetScrollPercentage();
            });
        }

        window.sc = sc;
        this.editor = editor;
    }
    
    handleChange = (value) => {
        const { onChange, onSetIsLastLine } = this.props;        
        onChange(this.editor.getValue());
        this.handleSetScrollPercentage();

        // 수정된 라인을 감지하고 현재 줄이 마지막 줄인지 아닌지 확인
        const currentRow = this.editor.getCursorPosition().row;
        if(currentRow === this.lastEditedRow) {
            return;
        } else {
            this.lastEditedRow = currentRow;
            const lastRow = this.editor.getSession().getLength() - 1;
            onSetIsLastLine(currentRow === lastRow);
        }
    }

    handleSetScrollPercentage = () => {
        const { onSetScrollPercentage } = this.props;

        const scroll = document.getElementsByClassName('ace_scrollbar-inner')[0];

        const offsetHeight =  document.getElementsByClassName('ace_scrollbar-v')[0].offsetHeight;
        const height = scroll.scrollHeight;
        const top = this.editor.getSession().getScrollTop();
        const percentage = top / (height - offsetHeight);

        onSetScrollPercentage(percentage);
    }


    render() {
        const { handleChange } = this;
        const { fullscreen, onSetFullscreen } = this.props;

        return (
            <div className="editor-wrapper">
                <div 
                    className={`editor ${fullscreen?'fullscreen':''}`} 
                    onKeyUp={handleChange}>
                    <div 
                        className="ace"
                        id="ace-editor">
                    </div>
                    <FullScreenToggler 
                        current={fullscreen} 
                        onClick={onSetFullscreen}
                    />

                </div>
            </div>
        );
    }
}

export default Editor;