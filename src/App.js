import React, {Component} from 'react';
import './styles/App.css';
import moment from 'moment';
import EventItem from './components/Event/Event';

class App extends Component {
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
        this.props.saveEvent(this.props.newEvent);
        event.preventDefault();
    };

    render() {
        const timeslots = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00'];

        const today = moment().format('dddd, D MMMM YYYY');
        const startTime = 8;
        const endTime = 17;
        const allTimeslotsMin = (endTime - startTime) * 60;

        return (
            <div className="app">
                <header className="app-header">
                    <h1 className="app-title">{today}</h1>
                </header>

                {this.props.isCreateEventVisible && <div className="control-panel">
                    <form className="add-event-block" name="add-event" onSubmit={this.saveEvent}>
                        <p className="title">Create an event (available time 08:00 to 16:59)</p>

                        <div className="row">
                            <p>Start time</p>
                            <input className="start-time" type="time" defaultValue="08:00" onChange={this.onChangeStart}/>
                        </div>

                        <div className="row">
                            <p>End time</p>
                            <input className="event-duration" type="time" onChange={this.onChangeEnd}/>
                        </div>

                        <input className="add-event-title" type="text" placeholder="Enter the event title"
                               pattern="\w+" onChange={this.onChangeTitle} />

                        <button className="btn add-event-btn" type="submit" onClick={this.saveEvent}>Add event</button>

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
                                <div className={`timeslot-wrap ${hours}`}>
                                    <p className="timeslot">{elem}</p>
                                </div>
                            );
                        })}
                    </div>

                    {this.props.eventList.map(event => {
                        return <EventItem allTimeslotsMin={allTimeslotsMin} event={event} removeEvent={this.props.removeEvent}/>
                    })}

                    <button className="add-btn" title="Create event" onClick={this.props.openCreateEventBlock}>
                        <i className="fa fa-plus"/>
                    </button>
                </div>

                <footer className="footer">
                    <p className="copyright">&copy; 2018 VB Inc. All Rights Reserved.</p>
                </footer>
            </div>
        );
    }
}

export default App;
