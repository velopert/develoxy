import React from 'react';
import Modal from 'components/Common/Modal';

const LinkAccountModal = ({onHide, visible}) => {
    return (
        <Modal 
            onHide={onHide}
            visible={visible}
        >
            테스팅왕 김테스팅
        </Modal>
    );
};

export default LinkAccountModal;