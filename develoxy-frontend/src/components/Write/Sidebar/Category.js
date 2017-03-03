import React from 'react';
import CategoryItem from './CategoryItem';
import { treeize, flatten } from 'helpers/category';

const Category = ({category, onConfigure}) => {

    
    
    const categoryList = category.map(
        (item) => {
            return (
                <CategoryItem
                    key={item.get('id')}
                    id={item.get('id')}
                    name={item.get('name')}
                    depth={item.get('depth')}
                />
            )
        }
    );

    // const ordered = flatten(treeize(category.toJS()));
    // console.log(ordered);

    return (
        <div className="category">
            <div className="edit" onClick={onConfigure}>[수정]</div>
            {categoryList}
        </div>
    );
};

export default Category;