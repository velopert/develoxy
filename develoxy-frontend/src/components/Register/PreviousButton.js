import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router';

const PreviousButton = () => {
    return (
        <Link className="previous-button" to="/">
            <Icon fitted name="chevron left"/>
            뒤로가기
        </Link>
    );
};

export default PreviousButton;