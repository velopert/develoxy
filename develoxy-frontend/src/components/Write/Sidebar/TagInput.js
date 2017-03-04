import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

class TagInput extends Component {

    state = { 
        value: ''
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    handleKeyPress = (e) => {
        const { onInsert } = this.props;
        const { value } = this.state;


        if(e.key === 'Enter') {
            onInsert(value);
            this.setState({
                value: ''
            });
        }
    }


    render() {
        const { value } = this.state;
        const { handleChange , handleKeyPress } = this;
        

        return (
            <Input 
                className="tag-input" 
                placeholder="태그"
                icon="tag" 
                iconPosition="left"
                value={value}
                onKeyPress={handleKeyPress}
                onChange={handleChange}
            />
        );
    }
}

export default TagInput;