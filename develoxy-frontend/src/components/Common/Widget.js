import React from 'react';

const Widget = ({children, className}) => {
    return (
        <div className={`common widget ${className}`}>
            {children}
        </div>
    );
};

export default Widget;