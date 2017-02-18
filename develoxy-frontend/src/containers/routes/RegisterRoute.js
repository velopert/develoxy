import React, {Component} from 'react';
import Register, { 
    TitleBar,
    Content,
    PreviousButton,
    InputUsername,
    Loader
} from 'components/Register/Register';
import { connect } from 'react-redux';
import * as form from 'redux/modules/form';
import * as register from 'redux/modules/register';
import { bindActionCreators } from 'redux';
import debounce from 'lodash/debounce';
import { Message } from 'semantic-ui-react';
import storage from 'helpers/storage';



class RegisterRoute extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        // 500 ms 에 한번만 요청하도록 제한한다
        this.handleCheckUsername = debounce(this.handleCheckUsername, 500);
    }

    handleChange = (e) => {
        const { FormActions } = this.props;
        
        const value = e.target.value;

        FormActions.change({
            formName: 'register',
            name: 'username',
            value
        });

        this.handleValidate(value);
    }

    componentDidMount() {
        const { FormActions, status: { auth } } = this.props;
        FormActions.initialize('register');
    }

    componentDidUpdate(prevProps, prevState) {
        const { status: { auth } } = this.props;
        
        // 프로필이 생성 되었으면 메인페이지로 이동한다
        if(auth.getIn(['profile', 'username'])) {
            this.context.router.push('/');
        }
        
    }
    
    

    handleRegister = async () => {
        const { status: { auth }, form } = this.props;

        const username = form.value;

        const user = auth.get('user');

        const { RegisterActions } = this.props;

        const { uid, photoURL, displayName, email } = user;

        try {
            await RegisterActions.claimUsername({uid, username});

            await RegisterActions.register({
                uid,
                username,
                displayName,
                email,
                thumbnail: photoURL 
            });

            // 가입 성공
            this.context.router.push('/');

        } catch (e) {
            // 에러 발생!

            // 현재 나의 프로필을 확인하고, 존재한다면 메인페이지로 5초후 리디렉팅한다.
            // 실시간으로 전달받은 그 profileData 확인하고 그거 null 아니면 리디렉팅 하는거죠.
            

            // input 을 초기화시키고 다시 시도해보게 한다
            // (가입 도중에 그게 갑자기 중복이 될 가능성 매우 희박하지만..)
            const { FormActions } = this.props;

            FormActions.change({
                formName: 'register',
                name: 'username',
                value: ''
            });

            RegisterActions.setValidity({
                valid: false,
                message: '알 수 없는 에러 발생! 다시 시도 해주세요.'
            });

        }
    }

    handleValidate = (username) => {
        const { RegisterActions } = this.props;

        // username 정규식 체크
        const regex = /^[0-9a-z_]{4,20}$/;
        if(!regex.test(username)) {
            RegisterActions.setValidity({
                valid: false,
                message: '4~20자의 영문 소문자, 숫자와 밑줄(_)만 사용 가능합니다.'
            });
            return;
        } else {
            RegisterActions.setValidity({
                valid: true,
                message: ''
            });
        }

        this.handleCheckUsername(username);
    }

    handleCheckUsername = async (username) => {
        const { RegisterActions } = this.props;

        // username 중복체크
        const result = await RegisterActions.checkUsername(username);

        if(!result.value.available) {
            RegisterActions.setValidity({
                valid: false,
                message: '사용중인 아이디입니다.'
            });
        } else {
            RegisterActions.setValidity({
                valid: true,
                message: ''
            });
        }
    }

    
    render() {
        const { handleRegister, handleValidate, handleChange } = this;
        const { status: { auth, validation, loading }, form: { value } } = this.props;


        return (
            <Register>
                <TitleBar>
                    <PreviousButton/>
                </TitleBar>
                <Content>
                    <InputUsername 
                        onClick={handleRegister} 
                        onValidate={handleValidate} 
                        error={validation.get('valid') === false}
                        loading={loading}
                        onChange={handleChange}
                        value={value}
                    />
                    {
                        !validation.get('valid') && (
                            <Message color="red">
                                { validation.get('message') }
                            </Message>
                        )
                    }
                    <Loader/>
                </Content>
            </Register>
        );
    }


}

RegisterRoute = connect(
    state => ({
        status: {
            auth: state.base.auth,
            validation: state.register.get('validation'),
            loading: {
                checkUsername: state.register.getIn(['requests', 'checkUsername', 'fetching']),
                claimUsername: state.register.getIn(['requests', 'claimUsername', 'fetching']),
                register: state.register.getIn(['requests', 'register', 'fetching'])
            }
        },
        form: {
            value: state.form.getIn(['register', 'username'])
        }
    }),
    dispatch => ({
        FormActions: bindActionCreators(form, dispatch),
        RegisterActions: bindActionCreators(register, dispatch)
    })
)(RegisterRoute);

export default RegisterRoute;