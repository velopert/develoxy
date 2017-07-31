import React, { Component } from 'react';
import styled from 'styled-components';

const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
}

class Preview extends Component {

    static defaultProps = {
        title: '',
        content: ''
    }


    render() {
        const { id, title, content, date, onClick, isTemp, tags  } = this.props;
        
        const temporary = (
            <span className="temp">[임시]</span>
        );

        const tagList = tags.map(
            tag => <span className="tag" key={tag}>{tag}</span>
        )


        return (
            <div className="preview-wrapper" onClick={()=>onClick(id)}>
                <div className="preview">
                    <div className="title">{isTemp && temporary} {title}</div>
                    <div className="date">{formatDate(date)}</div>
                    <div className="content">{content}</div>
                    <div className="tags">
                        {tagList}
                    </div>
                </div>
            </div>
        );
    }
}


export default Preview;