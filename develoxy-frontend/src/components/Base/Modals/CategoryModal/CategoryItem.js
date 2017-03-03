import React from 'react';

const CategoryItem = ({onMouseDown, children}) => {
    return (
        <div className="category-item" onMouseDown={onMouseDown}>
            <span className="name">{children}</span>
        </div>
    );
};

export default CategoryItem;