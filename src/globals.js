import moment from 'moment';

const getDiff = (a, b) => {
    const start = moment(a, 'HH:mm');
    const finish = moment(b, 'HH:mm');
    const diff = moment.duration(start - finish, "minutes");
    return (diff.toString().match(/\d+/i) / 1000);
};

export default getDiff;
