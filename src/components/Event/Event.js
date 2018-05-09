import React, {Component} from 'react';
import './styles/styles.css';

export default class EventItem extends Component {
    removeEvent = () => {
        this.props.removeEvent(this.props.event);
    };

    render() {
        const {event, allTimeslotsMin} = this.props;

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
    }
}