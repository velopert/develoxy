import React, { Component } from 'react';

class Preview extends Component {

    static defaultProps = {
        title: '타이틀',
        content: '내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 '
    }

    render() {
        const { title, content } = this.props;
        return (
            <div className="preview-wrapper">
                <div className="preview">
                    <div className="title">{title}</div>
                    <div className="date">2017.3.25</div>
                    <div className="content">{content}</div>
                </div>
            </div>
        );
    }
}


export default Preview;