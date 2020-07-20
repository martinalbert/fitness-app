import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import config from '../config'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: 'info@martin.com',
            password: 'password12345',
            redirect: false,
        }
        this.handleSubmitEvents = this.handleSubmitEvents.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }
    handleSubmitEvents(event) {
        // prevent defaults
        event.preventDefault()
        // set up a request
        const options = {
            method: 'post',
            url: '/user/login',
            baseURL: config.RESTAPI_URL,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email: this.state.email,
                password: this.state.password,
            },
        }
        // get a token
        axios(options)
            .then(result => {
                console.log(`Login token: ${result.data.dto}`)
                const token = result.data.dto
                // set Authorization header
                localStorage.setItem('Authorization', `Bearer ${token}`)
                // call parent function
                this.props.onSubmit(token)
                // set state to redirect
                this.setState({
                    redirect: true,
                })
            })
            .catch(err => {
                throw err
            })
    }
    handleEmailChange(event) {
        this.setState({ email: event.target.value })
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }
    render() {
        const { redirect } = this.state
        if (redirect) return <Redirect to="/feed" />
        return (
            <form onSubmit={this.handleSubmitEvents}>
                <h3>Log In</h3>

                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
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
                        onChange={this.handlePasswordChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                    Submit
                </button>
            </form>
        )
    }
}
