import React, { Component } from 'react';
import Tree from 'react-ui-tree';
import 'react-ui-tree/dist/react-ui-tree.css';
import { flatten, diff } from 'helpers/category';

const Category = ({module}) => {
    return (
        <div>
            {module}
            <button>삭제할테면 해봐</button>
        </div>
    );
};


class Test extends Component {


    onRemove = (id) => {
        console.log(id);
    }

    renderNode = (node) => {
        return (
            <div>
                {node.module}
                <button onClick={()=>{this.onRemove(node.id)}}>삭제할테면 해봐</button>
            </div>
        );

    }

    state = { 
        tree: {
            id: 1,
            "module": "dev.log",
            "children": [
                {
                    id: 2,
                    "module": "Frontend",
                    "children": [
                        {
                            id: 6,
                            "module": "React"
                        },
                        {
                            id: 7,
                            "module": "Vue"
                        }
                    ]
                },
                {
                    id: 3,
                    "module": "Backend",
                    "children": [
                        {
                            id: 4,
                            "module": "Node.js"
                        },
                        {
                            id:5,
                            "module": "Mongodb"
                        }
                    ]
                }
            ]
        }
    }

    componentDidMount() {
        this.setState({
            flatTree: flatten(this.state.tree)
        });
    }

    handleChange = (tree) => {
        console.log(diff(flatten(tree), this.state.flatTree));
        this.setState({
            tree,
            flatTree: flatten(tree)
        })
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