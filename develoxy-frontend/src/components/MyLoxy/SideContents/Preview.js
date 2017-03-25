import React, { Component } from 'react';

class Preview extends Component {

    static defaultProps = {
        title: '타이틀',
        contents: '내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 '
    }

    render() {
        const { title } = this.props;

        return (
            <div className="preview-wrapper">
                <div className="preview">
                    <div className="title">{title}</div>
                </div>
            </div>
        );
    }
}


export default Preview;