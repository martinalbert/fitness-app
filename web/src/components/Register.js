import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: 'Test',
            email: 'testing@test.com',
            password: 'password12345',
            redirect: false,
        }
        this.handleSubmitEvents = this.handleSubmitEvents.bind(this)
        this.handleChangeEvents = this.handleChangeEvents.bind(this)
    }
    handleSubmitEvents(event) {
        // prevent defaults
        event.preventDefault()
        // set up a request
        const options = {
            method: 'post',
            url: '/user/register',
            baseURL: config.RESTAPI_URL,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                userName: this.state.userName,
                email: this.state.email,
                password: this.state.password,
            },
        }
        // get a token
        let message
        axios(options)
            .then(result => {
                message = `User with email:${result.data.dto.email} was created.`
                // call parent function
                this.props.onSubmit(message)
                // set state to redirect
                this.setState({
                    redirect: true,
                })
            })
            .catch(err => {
                throw new Error('Register failed')
            })
    }
    handleChangeEvents(event) {
        this.setState({ value: event.target.value })
    }
    render() {
        const { redirect } = this.state
        if (redirect) return <Redirect to="/login" />
        return (
            <form onSubmit={this.handleSubmitEvents}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label htmlFor="userName">User Name</label>
                    <input
                        type="text"
                        id="userName"
                        className="form-control"
                        placeholder="User Name"
                        value={this.state.userName}
                        onChange={this.handleChangeEvents}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChangeEvents}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.handleChangeEvents}
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                    Register
                </button>
                <p className="forgot-password text-right">
                    Already registered?
                    <Link to={'/login'}>Login</Link>
                </p>
            </form>
        )
    }
}
