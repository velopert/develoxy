import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';



const SortItem = ({value, position, currentValue, icon, onSelect, tooltip}) => (
    <Popup 
        trigger={(
            <div 
                className={`sort-item ${position} ${value===currentValue ? 'active' : ''}`} 
                onClick={()=>onSelect(value)}>
                <Icon name={icon} fitted/>
            </div>
        )}
        content={tooltip}
        positioning="bottom center"
        inverted
    />
);


    // <Popup
    //     trigger={<Icon name='heart' color='red' size='large' circular />}
    //     content='I am positioned to the bottom center'
    //     positioning='bottom center'
    //     inverted
    // />

const Sorter = ({value, onSelect}) => {

    const position = {
        recent: 'left',
        like: 'center',
        popular: 'right'
    };

    return (
        <div className="sorter-wrapper">
            <div className="sorter">
                <div className={`selected ${position[value]}`}></div>
                <SortItem 
                    value="recent" 
                    position="left" 
                    currentValue={value} 
                    icon="clock" 
                    onSelect={onSelect}
                    tooltip="최신"
                />
                <SortItem 
                    value="like" 
                    position="center" 
                    currentValue={value} 
                    icon="heart" 
                    onSelect={onSelect}
                    tooltip="팔로잉"
                />
                <SortItem 
                    value="popular" 
                    position="right" 
                    currentValue={value} 
                    icon="line graph" 
                    onSelect={onSelect}
                    tooltip="인기"
                />
            </div>
        </div>
    );
};

export default Sorter;