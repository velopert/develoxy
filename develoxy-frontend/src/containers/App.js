import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// // load components
import Header, {SidebarButton, BrandLogo, AuthButton} from 'components/Base/Header/Header';

class App extends Component {   
    render() {        
        const { children } = this.props;

        return (
            <div>
                <Header>
                    <SidebarButton/>
                    <BrandLogo/>
                    <AuthButton/>
                </Header>
                {children}
            </div>
        );
    }
}

App = connect(
    state => ({
        status: {
            // something: state.something.get('something')
        }
    }),
    dispatch => ({
        // SomeActions: bindActionCreators(something, dispatch)
    })
)(App);

export default App;