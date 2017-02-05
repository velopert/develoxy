import React, {Component} from 'react';
import Widget from 'components/Common/Widget';
import { Icon } from 'semantic-ui-react';

const Item = ({type, children}) => {

    const icon = type === 'tag' ? 'hashtag' : 'user';

    return (
        <div className="item">
            <span className="prefix">
                <Icon name={icon} fitted/>
            </span>
            <span className="name">{children}</span>
            <span className="icon-pack">
                <Icon name="chevron circle up"/>
                <Icon name="chevron circle down"/>
                <Icon name="remove circle"/>
            </span>
        </div>
    )
}


class Favorite extends Component {
    render() {
        return (
            <Widget className="favorite">
                <div className="title">
                    즐겨찾기
                </div>
                <div className="list">
                    <Item type="user">velopert</Item>
                    <Item type="user">velopert</Item>
                    <Item type="user">velopert</Item>
                    <Item type="user">velopert</Item>
                    <Item type="tag">javascript</Item>
                    <Item type="tag">NodeJS</Item>
                    <Item type="tag">ReactJS</Item>
                </div>
            </Widget>
        );
    }
}

export default Favorite;