import React, {Component} from 'react';
import Main, { 
    LeftColumn,
    CenterColumn,
    RightColumn,
    // 좌측
    Sorter,
    Favorite,
    ButtonSet
} from 'components/Main/Main';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as main from 'redux/modules/main';


class MainRoute extends Component {

    mainHandler =(() => {
        const { MainActions } = this.props;

        return {
            setSorter: (value) => {
                MainActions.setSorter(value);
            }
        }
    })()

    render() {

        const { mainHandler } = this;
        const { status } = this.props;

        /* sorter */
        const sorterValue = status.main.getIn(['sorter', 'value']);


        return (
            <Main>
                <LeftColumn>
                    <Sorter onSelect={mainHandler.setSorter} value={sorterValue}/>
                    <Favorite/>
                    <ButtonSet/>
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

MainRoute = connect(
    state => ({
        status: {
            main: state.main
        }
    }),
    dispatch => ({
        MainActions: bindActionCreators(main, dispatch)
    })
)(MainRoute);

export default MainRoute;