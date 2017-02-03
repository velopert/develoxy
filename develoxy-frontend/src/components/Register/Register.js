import React from 'react';


const Register = ({ children }) => {
    return (
        <div className="register">
            { children }
        </div>
    );
};

export { default as TitleBar } from './TitleBar';
export { default as Content } from './Content';
export { default as PreviousButton } from './PreviousButton';
export { default as InputUsername } from './InputUsername';

export default Register;