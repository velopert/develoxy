import React from 'react';
import IonChevronDown from 'react-icons/io/chevron-down';

const menuText = {
    all: '전체보기',
    category: '카테고리',
    tag: '태그'
};

const SideContents = ({menu, count, children}) => {
    return (
        <div className="side-contents">
            <div className="header">
                <div className="title">
                    {menuText[menu]}
                </div>
                <div className="top-wrapper">
                    <div className="post-count">
                        {count}개의 포스트
                    </div>
                    <div className="sort-by">최신 순 <IonChevronDown className="icon"/></div> {/*나중에 컴포넌트 화 */}
                </div>
            </div>
            <div className="contents">
                {children}
            </div>
        </div>
    );
};

export default SideContents;