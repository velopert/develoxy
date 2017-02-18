import React, { Component } from 'react';

class CallbackRoute extends Component {
    render() {
        const { location: {query} } = this.props;

        return (
            <div>{JSON.stringify(query)}</div>
        );
    }
}

export default CallbackRoute;