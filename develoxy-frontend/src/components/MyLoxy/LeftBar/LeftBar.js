import React from 'react';
import CircularIcon from './CircularIcon';
import Thumbnail from './Thumbnail';

// 아이콘 불러오기
import IonHome from 'react-icons/io/home';
import IonSearch from 'react-icons/io/search';
import IonFolder from 'react-icons/io/folder';
import IonApps from 'react-icons/io/android-apps';
import IonPound from 'react-icons/io/pound';

const LeftBar = ({selected, onClick}) => {
    return (
        <div className="left-bar">
             <div className="logo">
                d
             </div>
             <div className="buttons">

                <CircularIcon tooltip="홈으로">
                    <IonHome className="icon"/>
                </CircularIcon>

                <CircularIcon tooltip="검색">
                    <IonSearch className="icon"/>
                </CircularIcon>

                <CircularIcon tooltip="전체보기" onClick={()=>{onClick('all')}} active={selected==='all'}>
                    <IonApps className="icon"/>
                </CircularIcon>

                <CircularIcon tooltip="카테고리" onClick={()=>{onClick('category')}} active={selected==='category'}>
                    <IonFolder className="icon"/>
                </CircularIcon>

                <CircularIcon tooltip="태그" onClick={()=>{onClick('tag')}} active={selected==='tag'} >
                    <IonPound className="icon" style={{fontSize: '1.2rem', transform: 'translateX(0.1rem)'}}/>
                </CircularIcon>

             </div>
             <div className="placeholder"></div>
             <Thumbnail/>
             

        </div>
    );
};

export default LeftBar;