import React from 'react';
import { Icon } from 'semantic-ui-react';

const SocialLoginButton = ({type}) => {
    return (
        <div className={`social-login-button ${type}`}>
            <Icon fitted name={type}/><b>{type}</b> 계정으로 시작하기
        </div>
    );
};

export default SocialLoginButton;