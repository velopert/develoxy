import React from 'react';
import Modal from 'components/Common/Modal';

const LinkAccountModal = ({onHide, visible, currentProvider, newProvider}) => {
    return (
        <Modal 
            onHide={onHide}
            visible={visible}
            className="link-account-modal"
        >
            테스팅왕 김테스팅
        </Modal>
    );
};

export default LinkAccountModal;