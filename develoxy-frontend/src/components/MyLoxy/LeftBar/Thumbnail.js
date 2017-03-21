import React from 'react';

import defaultThumbnail from 'static/images/default-thumbnail.png';


const Thumbnail = ({thumbnail}) => {
    return (
        <div className="thumbnail" style={{backgroundImage: `url(${thumbnail?thumbnail:defaultThumbnail})`}}>
            
        </div>
    );
};

export default Thumbnail;