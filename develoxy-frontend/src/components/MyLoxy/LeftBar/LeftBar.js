import React from 'react';
import CircularIcon from './CircularIcon';
import Thumbnail from './Thumbnail';

// 아이콘 불러오기
import IonHome from 'react-icons/io/home';
import IonSearch from 'react-icons/io/search';
import IonFolder from 'react-icons/io/folder';
import IonApps from 'react-icons/io/android-apps';
import IonPound from 'react-icons/io/pound';

const LeftBar = () => {
    return (
        <div className="left-bar">
             <div className="logo">
                d
             </div>
             <div className="buttons">
                <CircularIcon tooltip="홈으로"><IonHome className="icon"/></CircularIcon>
                <CircularIcon tooltip="검색"><IonSearch className="icon"/></CircularIcon>
                <CircularIcon tooltip="전체보기"><IonApps className="icon"/></CircularIcon>
                <CircularIcon tooltip="태그" ><IonFolder className="icon"/></CircularIcon>
                <CircularIcon tooltip="태그" ><IonPound className="icon" style={{fontSize: '1.2rem', transform: 'translateX(0.1rem)'}}/></CircularIcon>
             </div>
             <div className="placeholder"></div>
             <Thumbnail/>
             

        </div>
    );
};

export default LeftBar;