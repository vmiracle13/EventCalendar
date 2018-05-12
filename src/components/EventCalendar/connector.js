import { connect } from 'react-redux';
import EventCalendar from './EventCalendar';
import { openCreateEventBlock,
    closeCreateEventBlock,
    getEventList,
    removeEvent,
    changeStart,
    changeEnd,
    changeTitle,
    saveEvent,
    getAllEventList,
    incorrectDuration,
    isEmptyTitle
} from './actions';

const mapStateToProps = state => ({
    isCreateEventVisible: state.isCreateEventVisible,
    eventList: state.eventList,
    newEvent: state.newEvent,
    allEventList: state.allEventList,
    incorrectDurationInterval: state.incorrectDurationInterval,
    emptyTitle: state.emptyTitle
});

const mapDispatchToProps = {
    openCreateEventBlock,
    closeCreateEventBlock,
    getEventList,
    removeEvent,
    changeStart,
    changeEnd,
    changeTitle,
    saveEvent,
    getAllEventList,
    incorrectDuration,
    isEmptyTitle
};

const EventCalendarConnector = connect(mapStateToProps, mapDispatchToProps)(EventCalendar);

export default EventCalendarConnector;
