import React, { Component } from 'react';


const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
}
class Preview extends Component {

    static defaultProps = {
        title: '타이틀',
        content: '내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 '
    }


    render() {
        const { title, content, date } = this.props;

        return (
            <div className="preview-wrapper">
                <div className="preview">
                    <div className="title">{title}</div>
                    <div className="date">{formatDate(date)}</div>
                    <div className="content">{content}</div>
                </div>
            </div>
        );
    }
}


export default Preview;