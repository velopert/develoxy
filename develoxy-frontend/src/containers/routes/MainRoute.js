import React, {Component} from 'react';
import Main, { 
    LeftColumn,
    CenterColumn,
    RightColumn
} from 'components/Main/Main';


class MainRoute extends Component {

    render() {
        return (
            <Main>
                <LeftColumn>
                    1
                </LeftColumn>
                <CenterColumn>
                    2
                </CenterColumn>
                <RightColumn>
                    3
                </RightColumn>
            </Main>
        );
    }
}

export default MainRoute;


                // <Grid columns="equal">
                //     <Column>
                //         1
                //     </Column>
                //     <Column width={8}>
                //         2
                //     </Column>
                //     <Column>
                //         3
                //     </Column>
                // </Grid>