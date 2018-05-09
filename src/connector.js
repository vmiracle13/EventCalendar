import { connect } from 'react-redux';
import App from './App';
import { openCreateEventBlock,
    closeCreateEventBlock,
    getEventList,
    removeEvent,
    changeStart,
    changeEnd,
    changeTitle,
    saveEvent
} from './actions';

const mapStateToProps = state => ({
    isCreateEventVisible: state.isCreateEventVisible,
    eventList: state.eventList,
    newEvent: state.newEvent,
});

const mapDispatchToProps = {
    openCreateEventBlock,
    closeCreateEventBlock,
    getEventList,
    removeEvent,
    changeStart,
    changeEnd,
    changeTitle,
    saveEvent
};

const AppConnector = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnector;
