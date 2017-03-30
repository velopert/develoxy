import React, { Component } from 'react';
import EyeCatchy from 'components/Common/EyeCatchy';

class DuruwaBar extends Component {

    state = {
        closing: false
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.visible && !this.props.visible) {
            this.setState({
                closing: true
            });

            setTimeout(
                () => {
                    this.setState({
                        closing: false
                    });
                }, 300
            );
        }
    }
    
    render() {
        const { visible, onCancel } = this.props;
        const { closing } = this.state;

        if(!closing && !visible) return null;

        const animation = closing ? 'fadeOutLeft' : 'fadeInLeft';

        return (
            <EyeCatchy onHide={onCancel}> 
                <div className={`duruwa-bar ${animation}`}>
                    Hithere
                </div>
            </EyeCatchy>
        );
    }
}

// const DuruwaBar = ({visible, onCancel}) => {
//     if(!visible) return null;
    
//     return (
//         <EyeCatchy onHide={onCancel}> 
//             <div className={`duruwa-bar ${visible && 'visible'}`}>
//                 Hithere
//             </div>
//         </EyeCatchy>
//     );
// };

export default DuruwaBar;