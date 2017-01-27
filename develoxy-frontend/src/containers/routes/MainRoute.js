import React, {Component} from 'react';
import EyeCatchy from 'components/Common/EyeCatchy';

class MainRoute extends Component {

    state = {
        hide: false
    }

    handleHide = () => {
        this.setState({
            hide: true
        })
    }

    handleShow = () => {
        this.setState({
            hide: false
        })
    }

    render() {
        const { hide } = this.state;
        const { handleHide, handleShow } = this;
        return (
            <div>
                <button onClick={handleShow}>일단 눌러봐</button>
                <EyeCatchy hidden={hide} onHide={handleHide}>
                    <div style={{height: 400, width: 400, background: 'red'}}>
                        나는, 바깥을 누르거나, ESC 를 누르면 사라지지.
                    </div>
                </EyeCatchy>
            </div>
        );
    }
}

export default MainRoute;