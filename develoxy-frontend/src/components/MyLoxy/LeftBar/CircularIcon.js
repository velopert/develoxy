import React from 'react';
import ReactTooltip from 'react-tooltip';
const CircularIcon = ({children, tooltip}) => {
    return (
        <div className="circular-icon" data-tip={tooltip} data-place="right">
            {children}
            <ReactTooltip/>
        </div>
    );
};

export default CircularIcon;