import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import config from '../config'

export default class CreateActivity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 'yoga',
            description: 'test',
            duration: 150,
            dateTime: new Date().toISOString().split('Z')[0],
            location: 'ZA',
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
            method: 'post',
            url: '/activities',
            baseURL: config.RESTAPI_URL,
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('Authorization'),
            },
            data: {
                type: this.state.type,
                description: this.state.description,
                duration: this.state.duration,
                dateTime: this.state.dateTime,
                location: this.state.location,
            },
        }
        // create activity
        axios(options)
            .then(results => {
                console.log(`Activity: ${results.data.dto} was created.`)
                const activity = results.data.dto
                this.setState({ redirect: true })
            })
            .catch(err => {
                throw err
            })
    }
    handleTypeChange(event) {
        this.setState({ type: event.target.value })
    }
    handleDurationChange(event) {
        this.setState({ duration: event.target.value })
    }
    handleDateTimeChange(event) {
        this.setState({ dateTime: event.target.value })
    }
    handleLocationChange(event) {
        this.setState({ location: event.target.value })
    }
    handleDescriptionChange(event) {
        this.setState({ description: event.target.value })
    }
    render() {
        const { redirect } = this.state
        if (redirect) {
            return (
                <Redirect
                    to={{
                        pathname: '/feed',
                        state: { notification: 'Activity was sucessfully created.' },
                    }}
                />
            )
        }
        return (
            <form onSubmit={this.handleSubmitEvents}>
                <h3>Create new Activity</h3>

                <div className="form-group">
                    <label htmlFor="type">Choose a type</label>
                    <select
                        name="type"
                        id="type"
                        className="form-control"
                        value={this.state.type}
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
                        value={this.state.description}
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
                        value={this.state.duration}
                        onChange={this.handleDurationChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dateTime">Set a date</label>
                    <input
                        type="datetime-local"
                        name="dateTime"
                        id="dateTime"
                        className="form-control"
                        value={this.state.dateTime}
                        onChange={this.handleDateTimeChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Set a location</label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        className="form-control"
                        value={this.state.location}
                        onChange={this.handleLocationChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                    Submit
                </button>
            </form>
        )
    }
}
