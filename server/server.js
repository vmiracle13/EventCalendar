const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
const port = 3030;
app.use(bodyParser());

const cors = require('cors');
app.use(cors());

app.use('', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

const mongoose = require('mongoose');
const mongoEndpoint = 'mongodb://viktoriia.borysovska:123456789@ds119110.mlab.com:19110/eventcalendardb';

mongoose.connect(mongoEndpoint, function (err) {
    if (err) throw err;

    console.log('Successfully connected to database!');
});

const Schema = mongoose.Schema;
const eventCalendarSchema = new Schema({
    title: String,
    date: String,
    start: String,
    end: String,
    user: String
});

const EventCalendarModel = mongoose.model('EventCalendar', eventCalendarSchema, 'eventscollection');

//save event
app.post('/event', (req, res) => {
    const today = moment().format('DD-MM-YYYY');
    const newEvent = {...req.body, date: today};

    const newEventInstance = new EventCalendarModel(newEvent);

    try {
        newEventInstance.save(function(err) {
            if (err) throw err;

            res.status(200).send();
        });
    }
    catch(err) {
        console.log('The event have not been saved! Please, try again.', err);
        res.status(400);
    }
});

//delete event
app.delete('/event', (req, res) => {
    const today = moment().format('DD-MM-YYYY');

    try {
        EventCalendarModel.find({...req.body, date: today}, function(err, events) {
            if (err) {
                throw err;
            }

            events.every( item => {
                item.remove(function(err) {
                    if (err) {
                        throw err;
                    }

                    res.status(200).send();
                });
            });
        });
    }
    catch(err) {
        alert("The event has not been deleted. Please, try again.");
        res.status(400);
    }
});

//get all events in json format
app.get('/eventlist', (req, res) => {
    const today = moment().format('DD-MM-YYYY');

    try {
        EventCalendarModel.find({user: req.headers.authorization, date: today}, function(err, events) {
            if (err) {
                throw err;
            }

            res.json(events);
        });
    }
    catch(err) {
        console.log("The events can not be retrieved. Please, try later.");
        res.status(400);
    }
});

app.get('/all', (req, res) => {
    try {
        EventCalendarModel.find({user: req.headers.authorization}, function(err, events) {
            if (err) {
                throw err;
            }

            res.json(JSON.stringify(formattedResult(events)));
        });
    }
    catch(err) {
        console.log("The events can not be retrieved. Please, try later.");
        res.status(400);
    }
});


app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }

    console.log(`The server is hosted on localhost:${port}`);
});

const formattedResult = (arr) => {
    return arr.map( item => {
        const duration = getDiff(item.start.slice(-5), item.end.slice(-5));
        const start = getDiff('08:00', item.start.slice(-5));

        return {
            title: item.title,
            duration,
            start
        };
    });
};

const getDiff = (a, b) => {
    const start = moment(a, 'HH:mm');
    const finish = moment(b, 'HH:mm');
    const diff = moment.duration(start - finish, "minutes");
    return (diff.toString().match(/\d+/i) / 1000);
};
