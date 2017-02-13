import React from 'react';

const Box = ({title, children}) => {
    return (
        <div className="box">
            <div className="title">{title}</div>
            <div className="content">{children}</div>
        </div>
    );
};

export default Box;