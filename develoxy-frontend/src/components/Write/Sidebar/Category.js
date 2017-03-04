import React, { Component } from 'react';
import CategoryItem from './CategoryItem';
import { treeize, flatten } from 'helpers/category';

class Category extends Component {
    
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.category !== this.props.category;
    }
    
    render() {
        const { category, onConfigure, onToggle } = this.props;

        const categoryList = category.map(
            (item, i) => {
                return (
                    <CategoryItem
                        key={item.get('id')}
                        id={item.get('id')}
                        name={item.get('name')}
                        depth={item.get('depth')}
                        onToggle={() => onToggle(i)}
                        checked={item.get('value')}
                    />
                )
            }
        );  

        return (
            <div className="category">
                <div className="edit" onClick={onConfigure}>[수정]</div>
                {categoryList}
            </div>
        ); 
    }
}

export default Category
// const Category = ({category, onConfigure}) => {
//     const categoryList = category.map(
//         (item) => {
//             return (
//                 <CategoryItem
//                     key={item.get('id')}
//                     id={item.get('id')}
//                     name={item.get('name')}
//                     depth={item.get('depth')}
//                 />
//             )
//         }
//     );

//     // const ordered = flatten(treeize(category.toJS()));
//     // console.log(ordered);

//     return (
//         <div className="category">
//             <div className="edit" onClick={onConfigure}>[수정]</div>
//             {categoryList}
//         </div>
//     );
// };

// export default Category;