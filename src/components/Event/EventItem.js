import React, { Component } from 'react';
import getDiff from './../../globals';
import './styles/styles.css';

export default class EventItem extends Component {
    removeEvent = () => {
        this.props.removeEvent(this.props.event);
    };

    render() {
        const {event, allTimeslotsMin, stylesData} = this.props;

        const startInMin = getDiff('08:00', event.start.slice(-5));
        const durationInMin = getDiff(event.start.slice(-5), event.end.slice(-5));

        const top = startInMin * 100 / allTimeslotsMin;
        const height = durationInMin * 100 / allTimeslotsMin;

        return (
            <div className="event" style={{
                top: `${top}%`,
                left: `calc(60px + ${stylesData.left}%`,
                height: `${height}%`,
                right: `${stylesData.right}%`,
                maxWidth: '200px'
            }}>
                <p className="event-title">{event.title}</p>

                <button className="btn remove-btn" onClick={this.removeEvent}>
                    <i className="fa fa-times"/>
                </button>
            </div>
        );
    }
}