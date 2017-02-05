import React from 'react';
import Widget from 'components/Common/Widget';

const Button = ({text, count}) => {
    return (
        <div className="button">
            <span className="text">
                {text}
            </span>
            <span className="count">
                ({count})
            </span>
        </div>
    )
}

const ButtonSet = () => {
    return (
        <Widget className="button-set">
            <Button text="팔로잉중인 유저" count="10"/>
            <Button text="팔로잉중인 태그" count="10"/>
        </Widget>
    );
};

export default ButtonSet;