const express = require('express');
//install knex and sqlite3

// database access using knex
const db = require('../data/db-config.js');//connection to the database

const router = express.Router();

router.get('/', (req, res) => {
    //get the data from the db
    //select * from posts;
    db.select('*')
    .from('posts') //returns a promise
    .then(rows => {
        res.status(200).json({ data: rows });
    })
    .catch(error => {
        res.status(500).json({ message: "sorry!" })
    })
});

router.get('/:id', (req, res) => {
    db('posts')
    //.where({ "id", "=", req.params.id })
    .where({ id: req.params.id })
    .first()
    .then(post => {
        if (post) {
        res.status(200).json({ data:post  })
        } else {
        res.status(404).json({ message: "Post not found"})
        }
    })
    .catch(error => {
        res.status(500).json({ message: "sorry!" })
});
});

router.post('/', (req, res) => {
    db('posts')
    .insert(req.body, "id")
    .then(ids => {
        res.status(201).json({ results:ids });
    })
    .catch(error => {
        res.status(500).json({ message: "Sorry, you blurped" });
    });
});

router.put('/:id', (req, res) => {
const changes =req.body;
db('posts')
.where({ id: req.params.id })
.update(changes)
.then(count => {
    if(count > 0) {
        res.status(200).json({ message: 'record updated succesfully'})
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
})
.catch(error => {
    res.status(500).json({ message: 'sorry, you errored' })
    });
});

router.delete('/:id', (req, res) => {
    db('posts')
    .where({ id: req.params.id })
    .del() //delete the recods
    .then(count => {
        if (count>0) {
            res.status(200).json({ message: 'record deleted successfully' });
        } else {
            res.status(404).json({ message:'Post not found' });
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'sorry, ran into an error' })
    })
});

module.exports = router;