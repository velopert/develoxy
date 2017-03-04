import React, { Component } from 'react';
import Tag from './Tag';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' 

class TagContainer extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.tags !== this.props.tags;
    }
    
    render() {
        const { tags, onRemove } = this.props;

        const tagList = tags.map(
            (tag, i) => (
                <Tag key={tag} onRemove={() => onRemove(i)}>{tag}</Tag>
            )
        );

        return (
            <div className="tag-container">
                    <ReactCSSTransitionGroup
                        transitionName={{
                            enter: 'zoomIn',
                            leave: 'zoomOut'
                        }}
                        transitionEnterTimeout={100}
                        transitionLeaveTimeout={250}
                    >
                        {tagList}
                    </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default TagContainer;