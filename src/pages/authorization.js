import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../scss/pages/authorization.scss'

import {login} from '../api/userApi';
import Button from '../components/Button';
import Input from '../components/Input';
import logo from "../image/logo.svg";
import {OPEN_RESTORE_PASSWORD} from "../redux/actions/commonFlags";

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

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.login(this.state.form, () =>
            this.props.history.push('/admin/users/me')
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
                            label='Email'
                            required
                            value={this.state.form.email}
                            onChange={this.handleChange('email')}
                        />
                        <div style={{margin: '15px 0'}}>
                            <Input
                                label='Password'
                                type='password'
                                required
                                value={this.state.form.password}
                                onChange={this.handleChange('password')}
                            />
                        </div>
                        <Button
                            type='submit'
                            variant='large'
                        >
                            Sign in
                        </Button>
                    </form>
                    <Button
                        variant='large'
                        onClick={this.props.goToRestorePasswordPage}
                    >
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
