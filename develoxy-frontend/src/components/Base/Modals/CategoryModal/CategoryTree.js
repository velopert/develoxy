import React, { Component } from 'react';

import Tree from 'react-ui-tree';
import CategoryItem from './CategoryItem';

import 'react-ui-tree/dist/react-ui-tree.css';

import { flattenWithId } from 'helpers/category';

import { cloneDeep } from 'lodash';


class CategoryTree extends Component {

    state = {
        node: null,
        tree: null,
        prevTree: null
    }

    renderNode = (node) => {
        // return (
        //     <div className="category-item" onMouseDown={()=>{this.handleClickNode(node)}}>
        //         {node.name}
        //     </div>
        // );
        return (
            <CategoryItem onMouseDown={()=>{this.handleClickNode(node)}}>
                {node.name}
            </CategoryItem>
        )
    }

    componentDidMount() {
        this.setState({
            tree: this.props.tree,
            prevTree: cloneDeep(this.props.tree)
        });
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            tree: nextProps.tree,
            prevTree: cloneDeep(nextProps.tree)
        });
    }
    

    handleChange = (tree) => {
        // 선택된 아이템 없음 (카테고리 접기)
        if(!this.state.node) return;

        const { id, index, parentId } = this.state.node;

        // 맨 위 아이템을 움직일경우
        if(index === undefined) return;

        const flat = flattenWithId(tree);

        const nextIndex = flat[id].index;
        const nextParentId = parseInt(flat[id].parent, 10);
        
        if(flat[id].depth === 4) {
            // 취소
            this.setState({
                tree: cloneDeep(this.state.prevTree)
            });
            this.forceUpdate();
            return;
        }

        if(nextIndex !== index || nextParentId !== parentId) {
            console.log(flat[id]);

            this.props.onMove({
                id: id,
                index: nextIndex,
                parentId: nextParentId
            });
            this.setState({
                node: undefined
            });
        } else {
            this.setState({
                node: undefined
            });
        }
    }

    handleClickNode = (node) => {
        this.setState({
            node

        })
    }

    render() {
        if(!this.state.tree) return null;

        return (
            <Tree
                paddingLeft={10}
                tree={this.state.tree}
                renderNode={this.renderNode}
                onChange={this.handleChange}
            />
        );
    }
}

export default CategoryTree;