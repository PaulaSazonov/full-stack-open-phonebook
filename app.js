const express = require('express');
const parser = require('body-parser');
const logger = require('morgan');
const errorhandler = require('errorhandler')
const routes = require('./routes/index');

const app = express();

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
    },
    {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
    }
]

app.use(parser.json())
app.use(logger('dev'))
app.use(errorhandler())
app.use((req, res, next) => {
    req.persons = persons;
    next();
})

app.get('/api/persons', routes.getPersons);
app.get('/info', routes.getInfo);
app.get('/api/persons/:id', routes.getPerson);
app.delete('/api/persons/:id', routes.removePerson);
app.post('/api/persons', routes.addPerson);

app.listen(3001);