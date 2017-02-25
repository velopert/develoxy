import React from 'react';
import Modal from 'components/Common/Modal';
import { Icon, Button } from 'semantic-ui-react';

import { treeize } from 'helpers/category';
import CategoryTree from './CategoryTree';


const CategoryModal = ({onHide, visible,category}) => {

    const tree = treeize(category.toJS());

    return (
        <Modal 
            onHide={onHide}
            visible={visible}
            className="category-modal"
        >
            <div className="title-bar">
                <Icon name="setting" fitted/>
            </div>
            <div className="contents">
                <CategoryTree tree={tree}/>
            </div>
            <div className="footer">
                <Button onClick={onHide}>닫기</Button>
            </div>
        </Modal>
    );
};

export default CategoryModal;