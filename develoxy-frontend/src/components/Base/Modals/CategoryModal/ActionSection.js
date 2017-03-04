import React, { Component } from 'react';
import { Input, Button, Grid } from 'semantic-ui-react'

class ActionSection extends Component {

    state = {
        name: ''
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

    handleChangeInput = (e) => {
        this.setState({
            name: e.target.value
        });
    }
    
    handleChangeName = (e) => {
        const { node, onRename, onSetOption } = this.props;

        onRename({
            id: node.get('id'),
            name: this.state.name
        });

        onSetOption({
            optionName: 'selected',
            value: null
        });
    }

    handleCreate = () => {
        const { onCreate } = this.props;
        onCreate();
    }

    render() {
        const { node } = this.props;
        const { handleDelete, handleChangeInput, handleChangeName, handleCreate } = this;

        if(!this.state) return null;
        
        return (
            <div className="action-section">
                <Button basic className="add-category" onClick={handleCreate}>새 카테고리 만들기</Button>
                { node && node.size !== 0 ? (
                    <div className="action-container">
                        <Input onChange={handleChangeInput} value={this.state.name}/>
                        <div className="buttons-wrapper">
                            <Button.Group>
                                <Button onClick={handleChangeName}>수정</Button>
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