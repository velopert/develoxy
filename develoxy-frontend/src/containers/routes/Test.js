import React, { Component } from 'react';
import Tree from 'react-ui-tree';
import 'react-ui-tree/dist/react-ui-tree.css';
import { flatten, diff, treeize, orderify } from 'helpers/category';
import { Checkbox } from 'semantic-ui-react';


class Test extends Component {


    onRemove = (id) => {
        console.log(id);
    }

    renderNode = (node) => {
        return (
            <Checkbox label={node.name}/>
        );

    }

    state = { 
        tree: {
            
        }
    }

    componentDidMount() {
        const category = [
            {
                "id": 2,
                "name": "hello",
                "parentId": 0,
                "index": 0
            }, {
                "id": 3,
                "name": "hello",
                "parentId": 0,
                "index": 1
            }, {
                "id": 4,
                "name": "hello",
                "parentId": 0,
                "index": 2
            }, {
                "id": 5,
                "name": "hello",
                "parentId": 0,
                "index": 3
            }, {
                "id": 6,
                "name": "저기",
                "parentId": 0,
                "index": 4
            }, {
                "id": 7,
                "name": "저기",
                "parentId": 0,
                "index": 5
            }, {
                "id": 10,
                "name": "whatthe",
                "parentId": 0,
                "index": 6
            }, {
                "id": 9,
                "name": "저기",
                "parentId": 1,
                "index": 0
            }, {
                "id": 8,
                "name": "저기",
                "parentId": 1,
                "index": 1
            }, {
                "id": 1,
                "name": "hello",
                "parentId": 2,
                "index": 0
            }
        ];

        this.setState({
            tree: treeize(category)
        })
    }
    

    // componentDidMount() {
    //     // this.setState({
    //     //     flatTree: flatten(this.state.tree)
    //     // });
    // }

    handleChange = (tree) => {
        // console.log(diff(flatten(tree), this.state.flatTree));
        // console.log(flatten(tree));
        // this.setState({
        //     tree,
        //     flatTree: flatten(tree)
        // })
    }

    render() {
        return (
            <div>
                <Tree
                    paddingLeft={20}
                    tree={this.state.tree}
                    onChange={this.handleChange}
                    renderNode={this.renderNode}
                />
                <p style={{whiteSpace: 'pre'}}>
                {
                    JSON.stringify(this.state.tree, null, 2)
                }
                </p>
            </div>
        );
    }
}

export default Test;