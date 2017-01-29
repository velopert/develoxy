import React from 'react';

const Content = ({children}) => {
    return (
        <div className="content">
            <div className="greeting">
                환영합니다!
            </div>
            <div className="information">
                앞으로 develoxy 에서 사용 할 아이디를 설정하세요
            </div>
            {children}
        </div>
    );
};

export default Content;