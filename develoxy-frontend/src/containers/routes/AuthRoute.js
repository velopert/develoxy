import React, {Component} from 'react';

class AuthRoute extends Component {
    state = {
        value: 0
    }

    componentDidMount() {
        setInterval(
            () => {
                this.setState({
                    value: this.state.value + 1
                });
            }, 1000
        )
    }
    
    render() {
        return (
            <div>
                { this.state.value }!!
            </div>
        );
    }
}

export default AuthRoute;