import React from 'react';
import defaultThumbnail from 'static/images/default-thumbnail.png';

const UserButton = ({thumbnail, onClick}) => {
    return (
        <div className="user-button" onClick={onClick}>
            <div className="thumbnail" style={{backgroundImage: `url(${!thumbnail?defaultThumbnail:thumbnail})`}}></div>
        </div>
    );
};

export default UserButton;