import React from 'react';
import Tag from './Tag';

const TagContainer = ({tags}) => {
    return (
        <div className="tag-container">
            <Tag>어쩌구요</Tag>
            <Tag>안돼요</Tag>
            <Tag>푸어라라</Tag>
            <Tag>키터울</Tag>
            <Tag>키나더루오푸</Tag>
            <Tag>쿠러아니아</Tag>
        </div>
    );
};

export default TagContainer;