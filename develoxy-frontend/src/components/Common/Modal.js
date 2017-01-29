import React, {Component, PropTypes} from 'react';
import Dimmer from 'components/Common/Dimmer';
import EyeCatchy from 'components/Common/EyeCatchy';

class Modal extends Component {

    static propTypes = { 
        // 모달을 숨기는 함수
        onHide: PropTypes.func,
        // 모달이 보여질지 안보여질지 정함
        visible: PropTypes.bool,
        // 모달을 위한 엑스트라 클래스
        className: PropTypes.string
    }

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