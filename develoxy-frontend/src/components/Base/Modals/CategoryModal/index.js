import React from 'react';
import Modal from 'components/Common/Modal';
import { Icon, Button } from 'semantic-ui-react';

import { treeize } from 'helpers/category';
import CategoryTree from './CategoryTree';
import Disable from './Disable';
import { Segment } from 'semantic-ui-react'
import ActionSection from './ActionSection';


import ReactCSSTransitionGroup from 'react-addons-css-transition-group' 

const CategoryModal = ({
        onHide,
        visible,
        category,
        onMove,
        onRevert,
        waiting,
        activeNode,
        onError,
        error,
        onSetOption,
        selected,
        onDelete,
        onRename,
        onCreate
    }) => {

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
                <ReactCSSTransitionGroup
                    transitionName={{
                        enter: 'fadeIn',
                        leave: 'fadeOut'
                    }}
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    { waiting && <Disable/> }
                </ReactCSSTransitionGroup>
                <CategoryTree category={category} tree={tree} onMove={onMove} onRevert={onRevert} onError={onError} error={error} onSetOption={onSetOption}/>
                <ActionSection node={selected} onDelete={onDelete} onSetOption={onSetOption} onRename={onRename} onCreate={onCreate}/>
                {error && <Segment inverted color="red">{error}</Segment> }
            </div>
            <div className="footer">
                <Button onClick={onHide}>닫기</Button>
            </div>
        </Modal>
    );
};

export default CategoryModal;