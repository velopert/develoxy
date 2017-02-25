import React from 'react';
import { Checkbox } from 'semantic-ui-react';

const CategoryItem = ({id, name, depth}) => {
    const padding = {
        paddingLeft: `${depth*1}rem`
    }
    return (
        <div className="category-item" style={padding}>
            <Checkbox label={name}/>
        </div>
    );
};

export default CategoryItem;