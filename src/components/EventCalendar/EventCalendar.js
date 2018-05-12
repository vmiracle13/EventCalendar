import React, { Component } from 'react';
import moment from 'moment';
import EventItem from '../Event/EventItem';
import '../../styles/App.css';

const timeslots = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00'];

const today = moment().format('dddd, D MMMM YYYY');
const startTime = 8;
const endTime = 17;
const allTimeslotsMin = (endTime - startTime) * 60;

class EventCalendar extends Component {
    componentDidMount() {
        this.props.getEventList();
    }

    onChangeStart = (event) => {
        this.props.changeStart(event.target.value);
    };

    onChangeEnd = (event) => {
        this.props.changeEnd(event.target.value);
    };

    onChangeTitle = (event) => {
        this.props.changeTitle(event.target.value);
    };

    saveEvent = (event) => {
        if (this.validateTitle(this.props.newEvent.title)) {
            if (this.validateTime(this.props.newEvent.start, this.props.newEvent.end)) {
                this.props.saveEvent(this.props.newEvent);
                event.preventDefault();
            } else {
                this.props.incorrectDuration();
            }
        } else {
            this.props.isEmptyTitle();
        }
    };

    validateTitle = (value) => !!value && /\w+/ig.test(value);

    validateTime = (start, end) => end > start && end < '17:00' && start > '07:59';

    render() {
        const {
            eventList,
            isCreateEventVisible,
            removeEvent,
            openCreateEventBlock,
            allEventList,
            getAllEventList,
            incorrectDurationInterval,
            emptyTitle
        } = this.props;

        return (
            <div className="app">
                <header className="app-header">
                    <h1 className="app-title">{today}</h1>

                    {this.props.context.isAuthenticated() &&
                    <button className="btn logout-btn" onClick={this.props.context.logout.bind(this)}>
                        Log out
                    </button>
                    }
                </header>

                {isCreateEventVisible && <div className="control-panel">
                    <form className="add-event-block" name="add-event">
                        <p className="title">Create an event (available time 08:00 to 16:59)</p>

                        <div className="row-wrapper">
                            <div className="row">
                                <p>Start time</p>
                                <input className="start-time"
                                       type="time"
                                       defaultValue="08:00"
                                       onChange={this.onChangeStart}
                                />
                            </div>

                            {incorrectDurationInterval && <p className="error">Incorrect start time</p>}
                        </div>

                        <div className="row-wrapper">
                            <div className="row">
                                <p>End time</p>
                                <input
                                    className="event-duration"
                                    type="time"
                                    defaultValue="08:01"
                                    onChange={this.onChangeEnd}
                                />
                            </div>

                            {incorrectDurationInterval && <p className="error">Incorrect end time</p>}
                        </div>

                        <input
                            className="add-event-title"
                            type="text"
                            placeholder="Enter the event title"
                            onChange={this.onChangeTitle} />

                        {emptyTitle && <p className="error">Empty title</p>}

                        <button className="btn add-event-btn" type="button" onClick={this.saveEvent}>Add event</button>

                        <button className="btn close-btn">
                            <i className="fa fa-times"/>
                        </button>
                    </form>
                </div>}

                <div className="event-calendar">
                    <div className="timeslot-grid">
                        {timeslots.map((elem, i, arr) => {
                            const hours = i % 2 === 0 ? "hours" : "full-time";

                            return (
                                <div className={`timeslot-wrap ${hours}`} key={i}>
                                    <p className="timeslot">{elem}</p>
                                </div>
                            );
                        })}
                    </div>

                    {eventList[0] !== undefined &&
                        <div>
                            {(eventList || []).map((col, i, eventList) => {
                                if (col[0] !== undefined) {
                                    return col.map( event => {
                                        const left = 100/eventList.length * i;
                                        const width = 100/eventList.length;
                                        const right = 100 - left - width;

                                        return <EventItem
                                            key={event.title}
                                            allTimeslotsMin={allTimeslotsMin}
                                            event={event}
                                            removeEvent={removeEvent}
                                            stylesData={ {right, left }}
                                        />
                                    });
                                }
                            })}
                        </div>
                    }

                    <button className="add-btn" title="Create event" onClick={openCreateEventBlock}>
                        <i className="fa fa-plus"/>
                    </button>
                </div>

                <button className="btn get-all-events" onClick={getAllEventList}>Get all events</button>
                {allEventList &&
                    <div>
                        <p className="all-events-title">The retrieved events from database are the following:</p>
                        <p>{allEventList}</p>
                    </div>
                }

                <footer className="footer">
                    <p className="copyright">&copy; 2018 VB Inc. All Rights Reserved.</p>
                </footer>
            </div>
        );
    }
}

export default EventCalendar;
