import React from 'react';
import ReactTooltip from 'react-tooltip';
const CircularIcon = ({children, tooltip, active, onClick}) => {
    return (
        <div onClick={onClick} className={`circular-icon ${active && 'active'}`}data-tip={tooltip} data-place="right">
            {children}
            <ReactTooltip/>
        </div>
    );
};

export default CircularIcon;