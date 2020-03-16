const express = require('express');

// database access using knex
const db = require('../data/db-config.js');//connection to the database

const router = express.Router();

router.get('/', (req, res) => {
    //get the data from the db
    //select * from posts;
    db.select('*').from('posts') //returns a promise
    .then(rows => {
        res.status(200).json({ data: rows });
    })
    .catch(error => {
        res.status(500).json({ message: "sorry!" })
    })
});

router.get('/:id', (req, res) => {

});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;