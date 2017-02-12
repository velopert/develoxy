import React, { PropTypes } from 'react';
import { Icon } from 'semantic-ui-react';


const FullScreenToggler = ({current, onClick}) => {
    return (
        <div className="full-screen-toggler-wrapper" onClick={
            () => onClick(!current)
        }>
            <div className={`full-screen-toggler ${current?'left':''}`}>
                <Icon name="chevron right" fitted/>
            </div>
        </div>
    );
};

FullScreenToggler.propTypes = {
    current: PropTypes.bool,
    onClick: PropTypes.func
}

export default FullScreenToggler;