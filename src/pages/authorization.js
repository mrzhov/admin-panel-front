import React, {Component} from 'react';
import {connect} from 'react-redux';

import {login} from '../api/userApi';
import Button from '../components/button';

import Input from '../components/Input';
import routes from '../route/routes';
import {OPEN_RESTORE_PASSWORD} from "../redux/reducers/commonFlags";
import logo from "../image/logo.svg";

class AuthorizationPage extends Component {
    state = {
        form: {
            email: '',
            password: '',
        },
    };

    handleChange(name) {
        return event => {
            const form = {
                ...this.state.form,
                [name]: event.target.value
            }
            this.setState({form});
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.login(this.state.form, () =>
            this.props.history.push(routes.startPage.path)
        );
    }

    render() {
        return (
            <div className='loginPage'>
                <div className='loginPage__wrapper'>
                    <div className='loginPage__logo'>
                        <img src={logo} alt="Logo"/>
                    </div>
                    <form
                        className='loginPage__form'
                        onSubmit={this.handleSubmit}
                    >
                        <Input
                            inputProps={{
                                onChange: this.handleChange('email'),
                                value: this.state.form.email,
                                required: true
                            }}
                            label='Email'
                        />
                        <div style={{margin: '15px 0'}}>
                            <Input
                                inputProps={{
                                    onChange: this.handleChange('password'),
                                    value: this.state.form.password,
                                    required: true
                                }}
                                label='Password'
                                type='password'
                            />
                        </div>
                        <Button
                            type='submit'
                            variant='large'
                        >
                            Sign in
                        </Button>
                    </form>
                    <Button variant='large' onClick={this.props.goToRestorePasswordPage}>
                        Forgot you password?
                    </Button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    login: (...args) => dispatch(login(...args)),
    goToRestorePasswordPage: () => {
        dispatch({
            type: OPEN_RESTORE_PASSWORD
        });
    }
});

export default connect(null, mapDispatchToProps)(AuthorizationPage);
