import React from 'react';
import { Grid } from 'semantic-ui-react';

const CenterColumn = ({children}) => {
    return (
        <Grid.Column width={8}>
            {children}
        </Grid.Column>
    );
};

export default CenterColumn;