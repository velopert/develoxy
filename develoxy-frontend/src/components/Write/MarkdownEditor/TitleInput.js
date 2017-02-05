import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react';

const TitleInput = () => {
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
                <input type="text" placeholder="포스트 제목"></input>
            </div>
        </div>
    );
};

export default TitleInput;