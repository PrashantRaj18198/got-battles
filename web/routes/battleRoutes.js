const express = require('express');
const Battle = require('../models/battleSchema');
const { populateData } = require('../testData');
const app = express();

// used for inserting the data row into the db
async function insertData(battleObject, req, res) {
    try {
        // find if the battle_number already exists in the db
        let battle = await Battle.find({ battle_number: battleObject['battle_number'] })
        // if it does not create one
        // else skip this object
        if (battle.length == 0) {
            await Battle.create(battleObject)
            console.log('inserted')
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            "err": err,
            "obj": battleObject
        })
    }

}

// this endpoint is for populating the test
// data into the db
app.get('/populate', async (req, res) => {
    // wait for the data array from populateData
    let testData = await populateData();
    console.log(testData)
    // for every object in an array of data
    for (const battleObject of testData) {
        // wait for this data to insert
        // into the db
        await insertData(battleObject, req, res)
    }
    // return all the data
    let battles = await Battle.find({});
    
    try {
        res.send(battles);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

app.get('/list', async (req, res) => {
    let list;
    try {
        // if a field param is provided
        if (req.query.field != undefined) {
            // field param must be singular and not an array
            // send 'Bad Request' if the field param is an array
            if (Array.isArray(req.query.field)) {
                res.status(400).send({
                    "err": "field must be singular"
                })
            }
            // field is singular use that for querying
            else {
                list = await Battle.find().distinct(req.query.field)
            }
        }
        // field isn't provided so default to 'region'
        else {
            list = await Battle.find().distinct('region');
        }
        res.send(list);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
})

app.get('/count', async (req, res) => {
    try {
        // simply count all the documents in the
        // battle collection and send it back
        const count = await Battle.countDocuments();
        res.send({count});
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
})

app.get('/search', async (req, res) => {
    try {
        // console.log(req.params);

        // everything without the 'king' field is of
        // the same name so query command does not change
        const kings = req.query['king'];
        let searchQuery = Object.assign({}, req.query);
        delete searchQuery['king'];

        // if king is present
        if (kings != undefined) {
            // if kings is an array make sure all
            // of them are in present either as attacker king
            // or defender king
            if (Array.isArray(kings)) {

                // all of them should be attacker or defender
                searchQuery['$and'] = [];

                for (const king in kings) {
                    // add the or condition for attaccker or defender
                    searchQuery['$and'].push({
                        '$or': [{'attacker_king': king}, {'defender_king': king}]
                    })
                }
            }
            // kings is just singular
            else {
                searchQuery['$or'] = [{'attacker_king': kings}, {'defender_king': kings}]
            }
        }
        console.log(searchQuery);
        searchResult = await Battle.find(searchQuery);
        res.send(searchResult);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
})


module.exports = app;