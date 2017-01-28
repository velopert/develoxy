import React, {Component} from 'react';
import Dimmer from 'components/Common/Dimmer';
import EyeCatchy from 'components/Common/EyeCatchy';

class LoginModal extends Component {

    state = {
        closing: false
    }

    componentDidUpdate (prevProps, prevState) {
        // visible 값이 비활성화 되면 closing 값을 true 로 바꾸고
        // 0.7초 이후에 원상복귀한다
        if(prevProps.visible && !this.props.visible) {
            console.log('ㅇㅇ');
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
        const { children, visible, onHide } = this.props;
        const { closing } = this.state;

        if(!closing && !visible) return null; 

        const animation = closing ? 'flipOutX' : 'flipInX';

        return (
            <div>
                <div className="login-modal-wrapper">
                    <EyeCatchy onHide={onHide}>
                        <div ref={ref=>{this.modal = ref}} className={`login-modal ${animation}`}>
                            <div className="exit" onClick={onHide}>✕</div>
                            <div className="logo">develoxy</div>
                            <div className="description">
                                <p><b>개발자</b>들을 위한 <b>글쓰기 플랫폼</b>,</p>
                                <p>여러분들도 한번 <b>시작</b>해보세요!</p>
                            </div>
                            <div className="buttons-wrapper">
                                {children}
                            </div>
                        </div>
                    </EyeCatchy>
                </div>
                <Dimmer/>
            </div>
        );
    }
}

export { default as SocialLoginButton } from './SocialLoginButton';
export default LoginModal;