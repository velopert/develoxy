import React from 'react';
import { Icon } from 'semantic-ui-react';

const SwitchButton = () => {
    return (
        <div className="switch-button">
            <Icon name="exchange"/>
            <div><b>록시패드</b>로 전환</div>
        </div>
    );
};

export default SwitchButton;