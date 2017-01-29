import React from 'react';

// re-export child components
export { default as BrandLogo } from './BrandLogo';
export { default as SidebarButton } from './SidebarButton';
export { default as AuthButton } from './AuthButton';
// const Header = ({children}) => {
//     return (
//         <div>
//             <div className="header-wrapper">
//                 <div className="header">
//                    {children}
//                 </div>
//             </div>
//             <div className="header-spacer">
//             </div>
//         </div>
//     );
// };

class Header extends React.Component {
    // shouldComponentUpdate (nextProps, nextState) {
    //     return false;
    // }
    
    render() {
        const { children } = this.props;
        return (
            <div>
                <div className="header-wrapper">
                    <div className="header">
                        {children}
                    </div>
                </div>
                <div className="header-spacer">
                </div>
            </div>
        )
    }
}
export default Header;


