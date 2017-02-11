import React, {Component, PropTypes} from 'react';
import showdown from 'showdown';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import $ from 'jquery';


class Preview extends Component {

    static propTypes = {
        markdown: PropTypes.string
    }

    state = {
        html: ''
    }

    converter = null


    componentDidMount() {
        const { markdown } = this.props;

        this.converter = new showdown.Converter();
        
        const html = this.converter.makeHtml(markdown);

        this.setState({
            html
        });

        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }


    componentWillReceiveProps(nextProps) {
        
        if(nextProps.markdown === this.props.markdown) return;

        const { markdown } = nextProps;
        const html = this.converter.makeHtml(markdown);
        
        this.setState({
            html
        });
    }    

    componentDidUpdate(prevProps, prevState) {
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }
    
    createMarkup = () => ({
        __html: this.state.html
    });

    render() {
        const { createMarkup } = this;

        return (
            <div className="preview-wrapper">
                <div className="preview" dangerouslySetInnerHTML={createMarkup()}></div>
            </div>
        );
    }
}

export default Preview;