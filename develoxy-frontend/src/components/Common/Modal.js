import React, {Component} from 'react';
import Dimmer from 'components/Common/Dimmer';
import EyeCatchy from 'components/Common/EyeCatchy';

class Modal extends Component {

    state = {
        closing: false
    }

    componentDidUpdate (prevProps, prevState) {
        // visible 값이 비활성화 되면 closing 값을 true 로 바꾸고
        // 0.7초 이후에 원상복귀한다
        if(prevProps.visible && !this.props.visible) {
            this.setState({
                closing: true
            });

            setTimeout(
                () => {
                    this.setState({
                        closing: false
                    });
                }, 700
            );
        }
    }
    
    render() {
        const { children, visible, onHide, className } = this.props;
        const { closing } = this.state;

        if(!closing && !visible) return null; 

        const animation = closing ? 'flipOutX' : 'flipInX';

        return (
            <div>
                <div className="modal-wrapper">
                    <EyeCatchy onHide={onHide}>
                        <div ref={ref=>{this.modal = ref}} className={`modal ${animation} ${className}`}>
                            { children }
                        </div>
                    </EyeCatchy>
                </div>
                <Dimmer/>
            </div>
        );
    }
}

export default Modal;