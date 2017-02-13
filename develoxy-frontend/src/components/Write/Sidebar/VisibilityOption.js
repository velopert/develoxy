import React, { Component, PropTypes } from 'react';


const OptionBlock = ({value, current, onClick, children}) => (
    <div 
        className={`option-block ${value} ${value===current ? 'active':''}`}
        onClick={()=>{onClick(value)}}
    >
        {children}
    </div>
)

class VisibilityOption extends Component {

    VisibilityOption = {
        value: PropTypes.string,
        onChange: PropTypes.func
    }

    state = {
        value: 'public'
    }

    componentWillReceiveProps(nextProps) {
        // value 가 다름
        if(this.props.value !== nextProps.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }
    

    handleClick = (value) => {
        this.setState({
            value
        });

        if(this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {
        const { handleClick } = this;
        const { value } = this.state;

        return (
            <div className="visibility-option">
                <OptionBlock value="public" onClick={handleClick} current={value}>공개</OptionBlock>
                <OptionBlock value="private" onClick={handleClick} current={value}>비공개</OptionBlock>
            </div>
        );
    }
}


export default VisibilityOption;