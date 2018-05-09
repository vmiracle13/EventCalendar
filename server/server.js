const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
const port = 3030;
app.use(bodyParser());

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
    duration: Number,
    start: Number
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
    const id = req.url.split('/')[2];

    const newEvent = req.body;

    try {
        EventCalendarModel.find(newEvent, function(err, events) {
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
        EventCalendarModel.find({date: today}, function(err, events) {
            if (err) {
                throw err;
            }

            res.json(formattedResult(events));
        });
    }
    catch(err) {
        console.log("The events can not be retrieved. Please, try later.");
        res.status(400);
    }
});

app.get('/all', (req, res) => {
    try {
        EventCalendarModel.find({}, function(err, events) {
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
        return {
            title: item.title,
            start: item.start,
            duration: item.duration
        }
    });
};
