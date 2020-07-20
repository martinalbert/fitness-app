import React, { Component } from 'react'
import _ from 'lodash'
import axios from 'axios'
import config from '../config'
import { Link } from 'react-router-dom'

export default class Feed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            offset: 0,
            activities: null,
            allActivities: null,
            perPage: 5,
            currentPage: 0,
        }
        this.handleTypeChange = this.handleTypeChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }
    componentDidMount() {
        // show notification if there is one
        if (this.props.location) {
            const notification = this.props.location.state.notification
            alert(notification)
        }
        // set up a request
        const options = {
            method: 'get',
            url: '/activities',
            baseURL: config.RESTAPI_URL,
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('Authorization'),
            },
        }
        // get activities
        axios(options)
            .then(results => {
                console.log(`Activities: ${results.data.dto} was extracted.`)
                const activities = _.sortBy(results.data.dto, ['id'])
                this.setState({ activities: activities, allActivities: activities })
            })
            .catch(err => {
                throw err
            })
    }
    handleTypeChange(event) {
        const { allActivities } = this.state
        this.setState({ activities: allActivities })
        if (event.target.value !== 'all') {
            const activities = _.filter(this.state.allActivities, { type: event.target.value })
            this.setState({ activities })
        }
    }
    handleUpdate(activity) {
        this.props.onUpdate(activity)
    }
    handleDelete(index, id) {
        // set up a request
        const options = {
            method: 'delete',
            url: `/activities/${id}`,
            baseURL: config.RESTAPI_URL,
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('Authorization'),
            },
        }
        // delete activity
        axios(options)
            .then(results => {
                console.log(`Activity with ID: ${id} was deleted.`)
                const { activities } = this.state
                activities.splice(index, 1)
                this.setState({ activities })
            })
            .catch(err => {
                throw err
            })
    }
    render() {
        const { activities } = this.state
        if (activities === null) return <p>Loading ...</p>
        return (
            <main className="mt-4">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-lg-4 text-center mb-4">
                        <Link className="btn btn-outline-primary btn-lg" to={`/activity`}>
                            Create new Activity
                        </Link>
                    </div>

                    <div className="form-group col-xs-12 col-lg-4">
                        <label htmlFor="type">Filter activities</label>
                        <select
                            name="type"
                            id="type"
                            className="form-control"
                            onChange={this.handleTypeChange}
                        >
                            <option value="all">All</option>
                            <option value="jogging">Jogging</option>
                            <option value="walking">Walking</option>
                            <option value="crossfit">Crossfit</option>
                            <option value="workout">Workout</option>
                            <option value="yoga">Yoga</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    {activities.map((activity, index) => (
                        <div key={index} className="col-xs-12 col-sm-12 col-lg-4">
                            <h1 className="display-3">{activity.type}</h1>
                            <p className="lead">{activity.description}</p>
                            <p className="lead">{activity.duration}</p>
                            <p className="lead">{activity.dateTime}</p>
                            <p className="lead">{activity.location}</p>
                            <Link
                                className="btn btn-primary"
                                onClick={() => this.handleUpdate(activity)}
                                to={`/activity/${activity.id}`}
                            >
                                update
                            </Link>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => this.handleDelete(index, activity.id)}
                            >
                                delete
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        )
    }
}
