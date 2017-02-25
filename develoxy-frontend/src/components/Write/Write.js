import React from 'react';

const Write = ({children}) => {
    return (
        <div className="route write">
            {children}
        </div>
    );
};


export { default as Content } from './Content';
export { default as MarkdownEditor } from './MarkdownEditor/MarkdownEditor';

export default Write;