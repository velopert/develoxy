import React from 'react';
import { Icon } from 'semantic-ui-react';
import EyeCatchy from 'components/Common/EyeCatchy';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const UserMenu = ({displayName, visible, onHide}) => {
    return (
        <div>
        <ReactCSSTransitionGroup
            transitionName={{
                enter: 'flipInX',
                leave: 'flipOutX'
            }}
            transitionEnterTimeout={700}
            transitionLeaveTimeout={700}
        >
            {
                visible && (
                    <EyeCatchy onHide={onHide}>
                        <div className="user-menu-wrapper">
                            <div className="user-menu">
                                <div className="menu-item">
                                    <div className="menu-name">
                                        <Icon name="user"/><span><b>@velopert</b></span>
                                    </div>
                                    <div className="description">내 <b>록시</b>로 이동</div>
                                </div>
                                <div className="menu-item">
                                    <div className="menu-name">
                                        <Icon name="write"/><span>새 포스트</span>
                                    </div>
                                </div>
                                <div className="menu-item">
                                    <div className="menu-name">
                                        <Icon name="setting"/><span>설정</span>
                                    </div>
                                </div>
                                <div className="menu-item">
                                    <div className="menu-name">
                                        <Icon name="help circle outline"/><span>고객센터</span>
                                    </div>
                                </div>
                                <div className="menu-item">
                                    <div className="menu-name">
                                        <Icon name="power"/><span>로그아웃</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </EyeCatchy>
                )
            }
        </ReactCSSTransitionGroup>
            
        </div>
    );
};

export default UserMenu;