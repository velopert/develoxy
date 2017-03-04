import React from 'react';

const Tag = ({children, onRemove}) => {
    return (
        <div className="tag" onClick={onRemove}>
            {children}
        </div>
    );
};

export default Tag;