import React, { Component } from 'react';
import Preview from './Preview';

const mockData = new Array(15);
mockData.fill(0);

class PreviewList extends Component {
    render() {

        const previewList = mockData.map(
            (preview, i) => (<Preview key={i}/>)
        );

        return (
            <div className="preview-list-wrapper">
                <div className="preview-list">
                    {previewList}
                </div>
            </div>
        );
    }
}

export default PreviewList;