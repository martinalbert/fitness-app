import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import config from '../config'

export default class UpdateActivity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activity: props.activity,
            redirect: false,
        }
        this.handleSubmitEvents = this.handleSubmitEvents.bind(this)
        this.handleTypeChange = this.handleTypeChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleDurationChange = this.handleDurationChange.bind(this)
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
    }
    handleSubmitEvents(event) {
        // prevent defaults
        event.preventDefault()
        // set up a request
        const options = {
            method: 'patch',
            url: `/activities/${this.state.activity.id}`,
            baseURL: config.RESTAPI_URL,
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('Authorization'),
            },
            data: this.state.activity,
        }
        // update activity
        axios(options)
            .then(results => {
                console.log(`Activity: ${results.data.dto} was updated.`)
                const activity = results.data.dto
                this.setState({ redirect: true })
            })
            .catch(err => {
                throw err
            })
    }
    handleTypeChange(event) {
        const { activity } = this.state
        activity.type = event.target.value
        this.setState({ activity })
    }
    handleDurationChange(event) {
        const { activity } = this.state
        activity.duration = event.target.value
        this.setState({ activity })
    }
    handleDateTimeChange(event) {
        const { activity } = this.state
        activity.dateTime = event.target.value
        this.setState({ activity })
    }
    handleLocationChange(event) {
        const { activity } = this.state
        activity.location = event.target.value
        this.setState({ activity })
    }
    handleDescriptionChange(event) {
        const { activity } = this.state
        activity.description = event.target.value
        this.setState({ activity })
    }
    render() {
        const { redirect } = this.state
        if (redirect) {
            return (
                <Redirect
                    to={{
                        pathname: '/feed',
                        state: { notification: 'Activity was sucessfully updated.' },
                    }}
                />
            )
        }
        return (
            <form onSubmit={this.handleSubmitEvents}>
                <h3>Update an Activity</h3>

                <div className="form-group">
                    <label htmlFor="type">Choose a type</label>
                    <select
                        name="type"
                        id="type"
                        className="form-control"
                        value={this.state.activity.type}
                        onChange={this.handleTypeChange}
                    >
                        <option value="jogging">Jogging</option>
                        <option value="walking">Walking</option>
                        <option value="crossfit">Crossfit</option>
                        <option value="workout">Workout</option>
                        <option value="yoga">Yoga</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Set a description</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        className="form-control"
                        value={this.state.activity.description}
                        onChange={this.handleDescriptionChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="duration">Set a duration</label>
                    <input
                        type="number"
                        name="duration"
                        id="duration"
                        className="form-control"
                        value={this.state.activity.duration}
                        onChange={this.handleDurationChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dateTime">Set a date</label>
                    <input
                        type="datetime-local"
                        name="dateTime"
                        id="dateTime"
                        className="form-control"
                        value={this.state.activity.dateTime.split('Z')[0]}
                        onChange={this.handleDateTimeChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Set a location</label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        className="form-control"
                        value={this.state.activity.location}
                        onChange={this.handleLocationChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                    Submit
                </button>
            </form>
        )
    }
}
