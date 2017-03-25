import React from 'react';
import EyeCatchy from 'components/Common/EyeCatchy';

const DuruwaBar = ({visible, onCancel}) => {
    return (
        <EyeCatchy onHide={onCancel}> 
            <div className={`duruwa-bar ${visible && 'visible'}`}>
                Hithere
            </div>
        </EyeCatchy>
    );
};

export default DuruwaBar;