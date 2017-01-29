import React, {Component} from 'react';
import Register, { 
    TitleBar,
    Content,
    PreviousButton,
    InputUsername
} from 'components/Register/Register';
import { connect } from 'react-redux';
// import * as form from 'redux/modules/form';
import * as register from 'redux/modules/register';
import { bindActionCreators } from 'redux';

class RegisterRoute extends Component {

    componentDidMount() {

    }

    handleRegister = (username) => {
        const { status: { auth } } = this.props;
        const user = auth.get('user');

        const { RegisterActions } = this.props;
        RegisterActions.register({user, username});
    }

    // 이걸 굳이 Redux 에 서 관리 할 필요 없다고 생각했어.
    // handleChange = (e) => {
    //     const { FormActions } = this.props;
    //     FormActions.change({
    //         formName: 'register',
    //         name: 'username',
    //         value: e.target.value
    //     });
    // }
    
    render() {
        const { handleRegister } = this;

        return (
            <Register>
                <TitleBar>
                    <PreviousButton/>
                </TitleBar>
                <Content>
                    <InputUsername onClick={handleRegister}/>
                </Content>
            </Register>
        );
    }
}

RegisterRoute = connect(
    state => ({
        status: {
            auth: state.base.auth
        }
    }),
    dispatch => ({
        // FormActions: bindActionCreators(form, dispatch)
        RegisterActions: bindActionCreators(register, dispatch)
    })
)(RegisterRoute);

export default RegisterRoute;