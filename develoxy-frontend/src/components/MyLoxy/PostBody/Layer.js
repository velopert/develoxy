import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' 

const Layer = ({visible}) => {
   

    return (
        <div>
            <ReactCSSTransitionGroup
                transitionName={{
                    enter: 'fadeIn',
                    leave: 'fadeOut'
                }}
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                { visible && <div className="layer"/>}
            </ReactCSSTransitionGroup>
        </div>
    );
};

export default Layer;