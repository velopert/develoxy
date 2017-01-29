import React from 'react';

const TitleBar = ({children}) => {
    return (
        <div className="title-bar">
            {children}
        </div>
    );
};

export default TitleBar;