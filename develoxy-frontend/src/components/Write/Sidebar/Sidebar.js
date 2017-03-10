import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';


class Sidebar extends Component {
    

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.tags !== this.props.tags
            || nextProps.category !== this.props.category;
    }
    
    render() {
        const { children } = this.props;

        return (
            <div className="sidebar">
                <Scrollbars style={{height: '100vh'}}>
                    <div style={{padding:'1rem'}}>
                        {children}
                    </div>
                </Scrollbars>
            </div>
        );
    }
}

export { default as SwitchButton } from './SwitchButton';
export { default as ImageUploadButton } from './ImageUploadButton';
export { default as Box } from './Box';
export { default as TagInput } from './TagInput';
export { default as TagContainer } from './TagContainer';
export { default as VisibilityOption } from './VisibilityOption';
export { default as Category } from './Category';

export default Sidebar;