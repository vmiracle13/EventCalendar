import React, {Component} from 'react';
import './styles/styles.css';

export default class EventItem extends Component {
    removeEvent = () => {
        this.props.removeEvent(this.props.event);
    };

    render() {
        const top = this.props.event.start * 100 / this.props.allTimeslotsMin;
        const left = 60;
        const height = this.props.event.duration * 100 / this.props.allTimeslotsMin;

        const title = this.props.event.title.length > 25 ? `${this.props.event.title.slice(0, 10)}...` : this.props.event.title;

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