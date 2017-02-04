import React from 'react';
import { Grid } from 'semantic-ui-react';

const LeftColumn = ({children}) => {
    return (
        <Grid.Column>
            {children}
        </Grid.Column>
    );
};

export default LeftColumn;