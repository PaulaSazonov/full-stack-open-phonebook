module.exports = {
    getPersons(req, res) {
        res.status(200).send(req.persons);
    },
    getInfo(req, res) {
        res.status(200).send(`Puhelinluettelossa on ${req.persons.length} henkilön tiedot ${new Date()}`)
    },
    getPerson(req, res) {
        const id = Number(req.params.id)
        const person = req.persons.find(p => p.id === id)
    
        if ( person ) {
            res.status(200).send(person);
        } else {
            res.status(404).end();
        }
    },
    removePerson(req, res) {
        const id = Number(req.params.id);
        const personIds = req.persons.map(i => i.id);
        if (personIds.includes(id)) {
            console.log(`Person ${req.persons.find(p => p.id === id).name} removed`)
            persons = req.persons.filter(p => p.id !== id);
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    },
    addPerson(req, res) {
        const generateId = () => {
            let min = req.persons.length > 0 ? req.persons.map(p => p.id).sort((a, b) => a - b).reverse()[0] : 1;
            return Math.floor(Math.random() * (100 - (min+1))) + min;  
        }

        let newPerson = {
            name: req.body.name,
            number: req.body.number,
            id: generateId()
        }
        req.persons.push(newPerson);
        res.status(201).send();
    }
}