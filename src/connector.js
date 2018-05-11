import { connect } from 'react-redux';
import App from './App';
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

const AppConnector = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnector;
