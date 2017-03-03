import React from 'react';

import { Loader } from 'semantic-ui-react'

const Disable = () => {
    return (
        <div className="disable-wrapper">
            <div className="disable">
                <Loader active/>
            </div>
        </div>
    );
};

export default Disable;