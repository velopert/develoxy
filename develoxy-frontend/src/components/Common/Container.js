import React from 'react';

const Container = ({children, className}) => {
    return (
        <div className={`common container ${className}`}>
            {children}
        </div>
    );
};

export default Container;