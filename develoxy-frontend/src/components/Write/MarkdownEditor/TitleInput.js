import React, { Component } from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

class TitleInput extends Component {

    constructor(props) {
        super(props);
        // this.handleChange = debounce(this.handleChange, 500);
        this.delayedChange = debounce(this.delayedChange, 100);
    }

    handleChange = (e) => {
        e.persist();
        this.delayedChange(e);
    }

    delayedChange = (e) => {
        const { onChange } = this.props;
        onChange(e.target.value);
    }
    
    render() {
        const { handleChange } = this;

        return (
            <div className="title-input">
                <div className="save-button">
                    <Button.Group color="pink">
                        <Button>임시저장</Button>
                        <Dropdown floating button className='icon'>
                        <Dropdown.Menu>
                            <Dropdown.Item icon='edit' text='Edit Post' />
                            <Dropdown.Item icon='delete' text='Remove Post' />
                            <Dropdown.Item icon='hide' text='Hide Post' />
                        </Dropdown.Menu>
                        </Dropdown>
                    </Button.Group>
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="포스트 제목" onChange={handleChange}></input>
                </div>
            </div>
        );
    }
}

export default TitleInput;