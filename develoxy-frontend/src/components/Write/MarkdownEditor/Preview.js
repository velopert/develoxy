import React, {Component, PropTypes} from 'react';
import showdown from 'showdown';



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