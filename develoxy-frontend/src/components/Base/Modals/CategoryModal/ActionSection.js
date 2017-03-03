import React, { Component } from 'react';
import { Input, Button, Grid } from 'semantic-ui-react'

class ActionSection extends Component {

    componentDidMount() {
        
    }
    

    componentWillReceiveProps(nextProps) {
        if(!nextProps.node) {
            return this.setState({
                name: ''
            })
        }
        this.setState({
            name: nextProps.node.get('name')
        });
    }

    handleDelete = () => {
        const { node, onDelete, onSetOption } = this.props;
        onDelete(node.get('id'));
        onSetOption({
            optionName: 'selected',
            value: null
        });
    }
    

    render() {
        const { node } = this.props;
        const { handleDelete } = this;

        if(!this.state) return null;
        
        return (
            <div className="action-section">
                { node.size !== 0 ? (
                    <div className="action-container">
                        <Input value={this.state.name}/>
                        <div className="buttons-wrapper">
                            <Button.Group>
                                <Button>수정</Button>
                                    <Button.Or />
                                <Button color="red" onClick={handleDelete}>삭제</Button>
                            </Button.Group>
                        </div>
                    </div>
                ) : (
                    <div className="not-selected">
                        수정 할 카테고리를 선택하세요.
                    </div>
                ) }
            </div>
        );
    }
}

export default ActionSection;