import React, { Component } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import Feed from './components/Feed'
import UpdateActivity from './components/UpdateActivity'
import CreateActivity from './components/CreateActivity'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: null,
            activity: null,
        }
        this.setupToken = this.setupToken.bind(this)
        this.setupActivity = this.setupActivity.bind(this)
        this.registerSucces = this.registerSucces.bind(this)
        this.logout = this.logout.bind(this)
    }
    setupToken(token) {
        this.setState({
            token,
        })
    }
    setupActivity(activity) {
        this.setState({
            activity,
        })
    }
    registerSucces(message) {
        alert(message)
    }
    logout() {
        this.setState = {
            token: null,
        }
        localStorage.setItem('Authorization', null)
        this.props.history.push('/')
    }
    render() {
        const loggedIn = this.state.token !== null
        return (
            <Router>
                <Navbar bg="light" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {loggedIn ? (
                            <Nav className="mr-auto">
                                <li className="nav-item p-4">
                                    <Link className="nav-link" to={'/'}>
                                        dashboard
                                    </Link>
                                </li>
                                <li className="nav-item" onClick={this.logout} className="p-4">
                                    <a href="/" className="nav-link">
                                        log out
                                    </a>
                                </li>
                            </Nav>
                        ) : (
                            <Nav className="mr-auto">
                                <li className="nav-item p-4">
                                    <Link className="nav-link" to={'/login'}>
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item p-4">
                                    <Link className="nav-link" to={'/register'}>
                                        Register
                                    </Link>
                                </li>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Navbar>

                <div className="container mt-4">
                    <Switch>
                        <Route exact path="/">
                            {loggedIn ? (
                                <Feed onUpdate={this.setupActivity} />
                            ) : (
                                <Login onSubmit={this.setupToken} />
                            )}
                        </Route>
                        <Route path="/login">
                            <Login onSubmit={this.setupToken} />
                        </Route>
                        <Route path="/register">
                            <Register onSubmit={this.registerSucces} />
                        </Route>
                        <Route path="/feed">
                            <Feed onUpdate={this.setupActivity} />
                        </Route>
                        <Route path="/activity/:id">
                            <UpdateActivity activity={this.state.activity} />
                        </Route>
                        <Route path="/activity">
                            <CreateActivity />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App
