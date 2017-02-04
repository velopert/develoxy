import React from 'react';
import { Image } from 'semantic-ui-react';


const UserButton = ({thumbnail, onClick}) => {
    return (
        <div className="user-button" onClick={onClick}>
            <div className="thumbnail" style={{backgroundImage: `url(${thumbnail})`}}></div>
        </div>
    );
};

export default UserButton;