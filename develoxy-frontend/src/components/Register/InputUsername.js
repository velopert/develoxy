import React, { Component } from 'react';
import { Icon, Input } from 'semantic-ui-react';
class InputUsername extends Component {
    render() {
        const { onClick, error, loading, value, onChange } = this.props;
        
        return (
            <div className="input-username">
                <Input
                    action={
                        { 
                            color: 'pink', 
                            labelPosition: 'right', 
                            icon: 'chevron right', 
                            content: '계속하기', 
                            onClick,
                            disabled: error || value === '',
                            loading: loading.register
                        }
                    }
                    placeholder="아이디"
                    onChange={onChange}
                    value={value}
                    error={error}
                    loading={loading.check} icon='user' iconPosition='left'
                />
            </div>
        ); 
    }
}

export default InputUsername;