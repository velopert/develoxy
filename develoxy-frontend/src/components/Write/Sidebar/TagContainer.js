import React, { Component } from 'react';
import Tag from './Tag';

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
                {tagList}
            </div>
        );
    }
}

export default TagContainer;