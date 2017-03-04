import React, { Component } from 'react';

import Tree from 'react-ui-tree';
import CategoryItem from './CategoryItem';

import 'react-ui-tree/dist/react-ui-tree.css';

import { flattenWithId } from 'helpers/category';

import { cloneDeep } from 'lodash';

import { Scrollbars } from 'react-custom-scrollbars';



class CategoryTree extends Component {

    state = {
        node: null,
        tree: null,
        prevTree: null,
        activeNode: null
    }

    renderNode = (node) => {
        // return (
        //     <div className="category-item" onMouseDown={()=>{this.handleClickNode(node)}}>
        //         {node.name}
        //     </div>
        // );
        return (
            <CategoryItem active={this.state.activeNode && node.id===this.state.activeNode.id} onMouseDown={()=>{this.handleClickNode(node)}} node={node}>
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

        if(this.props.category !== nextProps.category) {
            this.setState({
                activeNode: null
            });
        }

        this.setState({
            tree: nextProps.tree,
            prevTree: cloneDeep(nextProps.tree)
        });
    }
    

    handleChange = (tree) => {
        try {
            // 선택된 아이템 없음 (카테고리 접기)
            if(!this.state.node) return;

            const { id, index, parentId } = this.state.node;

            // 맨 위 아이템을 움직일경우
            if(index === undefined) return;

            const { onError } = this.props;

            const flat = flattenWithId(tree);

            const nextIndex = flat[id].index;
            const nextParentId = parseInt(flat[id].parent, 10);
            
            if(flat[id].depth === 4) {
                // 취소
                this.setState({
                    tree: cloneDeep(this.state.prevTree)
                });
                
                onError('카테고리 최고 깊이에 도달했습니다.');
                return;
            }

            if(nextIndex !== index || nextParentId !== parentId) {
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
        } catch (e) {
            this.forceUpdate();
        }
    }

    handleClickNode = (node) => {

        const { error, onError, onSetOption } = this.props;

        if(error) {
            onError(null);
        }

        if(node.id === 0) return;

        // // 선택이 이미 되어있으면 풀기
        const selected = this.state.activeNode && node.id===this.state.activeNode.id ? undefined : node;

        // redux store 에 담기

        // state 에도 담기
        this.setState({
            node,
            activeNode: selected
        });

        onSetOption({
            optionName: 'selected',
            value: selected
        });

    }

    render() {
        if(!this.state.tree) return null;

        return (
            <Scrollbars style={{height: '500px'}}>
                <Tree
                    paddingLeft={20}
                    tree={this.state.tree}
                    renderNode={this.renderNode}
                    onChange={this.handleChange}
                />
            </Scrollbars>
        );
    }
}

export default CategoryTree;