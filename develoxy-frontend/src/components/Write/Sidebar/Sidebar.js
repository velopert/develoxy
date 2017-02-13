import React from 'react';

const Sidebar = ({children}) => {
    return (
        <div className="sidebar">
            {children}
        </div>
    );
};

export { default as SwitchButton } from './SwitchButton';

export default Sidebar;