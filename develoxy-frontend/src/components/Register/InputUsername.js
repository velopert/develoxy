import React, { Component } from 'react';
import { Icon, Input } from 'semantic-ui-react';

class InputUsername extends Component {
    state = {
        value: ''
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        const { handleChange } = this;
        const { onClick } = this.props;
        const { value } = this.state;
        return (
            <div className="input-username">
                <Input
                    action={
                        { 
                            color: 'pink', 
                            labelPosition: 'right', 
                            icon: 'chevron right', 
                            content: '계속하기', 
                            onClick: () => { onClick(value) }
                        }
                    }
                    placeholder="아이디"
                    onChange={handleChange}
                    value={value}
                />
            </div>
        ); 
    }
}

export default InputUsername;