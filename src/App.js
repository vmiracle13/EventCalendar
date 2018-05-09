import React, {Component} from 'react';
import './App.css';
import moment from 'moment';

class App extends Component {
    removeEvent = () => {
        console.log('remove event');
    };

    render() {
        this.timeslots = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00'];

        const today = moment().format('dddd, D MMMM YYYY');
        const startTime = 8;
        const endTime = 17;
        const allTimeslotsMin = (endTime - startTime) * 60;

        this.events = [
            {start: 0, duration: 20, title: 'Exercise in training gym'},
            {start: 25, duration: 15, title: 'Travel to work'},
            {start: 80, duration: 10, title: 'Plan today'}
        ];

        return (
            <div className="app">
                <header className="app-header">
                    <h1 className="app-title">{today}</h1>
                </header>

                <div className="control-panel">
                    <form className="add-item-block">
                        <p className="title">Create an event (available time 08:00 to 16:59)</p>

                        <div className="row">
                            <p>Start time</p>
                            <input className="start-time" type="time" value="08:00" required/>
                        </div>

                        <div className="row">
                            <p>End time</p>
                            <input className="event-duration" type="time"/>
                        </div>

                        <input className="add-event-title" type="text" placeholder="Enter the event title" required
                               pattern="\w+"/>

                        <button className="btn add-event-btn">Add event</button>
                    </form>
                </div>


                <div className="event-calendar">

                    <div className="timeslot-grid">
                        {this.timeslots.map((elem, i, arr) => {
                            const hours = i % 2 === 0 ? "hours" : "full-time";

                            return (
                                <div className={`timeslot-wrap ${hours}`}>
                                    <p className="timeslot">{elem}</p>
                                </div>
                            );
                        })}
                    </div>

                    {this.events.map(event => {
                        const top = event.start * 100 / allTimeslotsMin;
                        const left = 60;
                        const height = event.duration * 100 / allTimeslotsMin;

                        const title = event.title.length > 25 ? `${event.title.slice(0, 10)}...` : event.title;

                        return (
                            <div className="event" style={{top: `${top}%`, left: `${left}px`, height: `${height}%`}}>
                                <p className="event-title">{title}</p>

                                <button className="btn remove-btn" onClick={this.removeEvent}>
                                    <i className="fa fa-times"/>
                                </button>
                            </div>
                        );
                    })}

                    <button className="add-btn" title=" event">
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
