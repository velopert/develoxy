import React from 'react';
import Modal from 'components/Common/Modal';
import { Icon, Button } from 'semantic-ui-react';

const LinkAccountModal = ({onHide, visible, existingProvider, provider, onLinkAccount}) => {
    return (
        <Modal 
            onHide={onHide}
            visible={visible}
            className="link-account-modal"
        >
            <div className="title-bar">
                <Icon name="exclamation triangle" fitted/>
            </div>
            <div className="message">
                <p><b>{existingProvider}</b> 계정으로 이미 가입을 하셨네요?</p>
                <p><b>{provider}</b> 계정과 연동하시겠어요?</p>
                <p className="warning">* <b>아니요</b>를 누르면 로그인이 취소됩니다.</p>
            </div>
            <div className="footer">
                <Button.Group>
                    <Button color="teal" onClick={onLinkAccount}>예</Button>
                    <Button.Or />
                    <Button color="red" onClick={onHide}>아니오</Button>
                </Button.Group>

            </div>
        </Modal>
    );
};

export default LinkAccountModal;