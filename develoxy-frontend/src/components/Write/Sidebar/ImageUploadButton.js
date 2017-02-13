import React from 'react';
import { Icon } from 'semantic-ui-react';

const ImageUploadButton = () => {
    return (
        <div className="image-upload-button">
            <Icon name="file image outline" fitted/>
            <div className="circle">
                <Icon name="add" fitted/>
            </div>
            
        </div>
    );
};

export default ImageUploadButton;