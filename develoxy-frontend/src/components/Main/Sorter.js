import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
const { Column } = Grid;

const Sorter = () => {
    return (
        <div className="sorter-wrapper">
            <div className="sorter">
                <div className="selected"></div>
                <div className="sort-item">
                    <Icon name="clock" fitted/>
                </div>
                <div className="sort-item">
                    <Icon name="heart" fitted/>
                </div>
                <div className="sort-item">
                    <Icon name="line graph" fitted/>
                </div>
            </div>
        </div>
    );
};

export default Sorter;