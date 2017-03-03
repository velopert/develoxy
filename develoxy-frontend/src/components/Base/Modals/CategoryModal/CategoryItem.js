import React from 'react';

const CategoryItem = ({onMouseDown, children, node, active}) => {
    return (
        <div className={`category-item ${active ? 'active' : ''} ${node.id !== 0 ? 'node':'root'}`} onMouseDown={onMouseDown}>
            <span className="name">{children}</span>
        </div>
    );
};

export default CategoryItem;