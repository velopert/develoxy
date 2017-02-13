import React from 'react';

const Sidebar = ({children}) => {
    return (
        <div className="sidebar">
            {children}
        </div>
    );
};

export { default as SwitchButton } from './SwitchButton';
export { default as ImageUploadButton } from './ImageUploadButton';
export { default as Box } from './Box';
export { default as TagInput } from './TagInput';
export { default as TagContainer } from './TagContainer';
export { default as VisibilityOption } from './VisibilityOption';

export default Sidebar;