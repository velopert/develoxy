import React, { Component } from 'react';

import Tree from 'react-ui-tree';
import 'react-ui-tree/dist/react-ui-tree.css';

import { flatten, diff } from 'helpers/category';

class CategoryTree extends Component {

    state = { 
        prevFlat: null,
        clickedId: null
    }

    
    componentWillMount() {
        console.log(this.props.tree);
        this.setState({
            prevFlat: flatten(this.props.tree)
        });
    }

    renderNode = (node) => {
        return (
            <div onMouseDown={()=>{this.handleClickNode(node.id)}}>
                {node.id} {node.name}
            </div>
        );
    }

    handleChange = (tree) => {
        const flat = flatten(tree);
        console.log(flat[this.state.clickedId]);
    }

    handleClickNode = (id) => {
        console.log(id);
        this.setState({
            clickedId: id
        })
    }

    render() {
        return (
            <Tree
                paddingLeft={20}
                tree={this.props.tree}
                renderNode={this.renderNode}
                onChange={this.handleChange}
            />
        );
    }
}

export default CategoryTree;