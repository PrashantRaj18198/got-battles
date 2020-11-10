
// data to populate the db
const fs = require('fs');
// promise based csv parser
const neatCsv = require('neat-csv');
const path = require('path');

const filePath = path.join(__dirname, 'battles.csv');
// regex for checking if the key value is  attackers or defenders 
const regex = {
    'attackers': new RegExp('attacker_[1-4]'),
    'defenders': new RegExp('defender_[1-4]')
}

// use this function to convert csv rows data
// to js object
const populateData = async function() {
    // read all the csv data in 'sync' mode
    const csv = fs.readFileSync(filePath);
    // parse the csv using neatCsv
    const parsedCsv = await neatCsv(csv);
    // variable for storing the js objects
    let data = [];
    
    for (const row of parsedCsv) {
        // define a 'newBattle' object
        let newBattle = {
            'attackers': [],
            'defenders': []
        };
        console.log(row)
        for (const key in row) {
            // isFighter is for figuring
            // if the key is attacker or defender
            // keep the isFighter 'false' at first
            let isFighter = false;
            // loop through the keys, i.e, attackers and defenders
            for (const fighterType in regex) {

                // if the regex matches it means it belongs
                // to the key of that regex, i.e, either
                // attackers or defenders
                if (regex[fighterType].exec(key)) {
                    // regex matched so the key is a fighter
                    // set isFighter to true
                    console.log(key, fighterType, '\n\n')
                    isFighter = true;
                    // if this fighter type is not empty
                    // add it to its respective array in the object
                    // otherwise ignore it
                    newBattle[fighterType].push(row[key])
                    // console.log(newBattle[fighterType])
                }
            }

            // if not (isFighter) is true it means
            // its not attacker of defender and is a singular value
            // assign it as such
            if (!isFighter) {
                newBattle[key] = row[key]
            }

        }
        // push this object into the data array
        data.push(newBattle)
    }
    // console.log(data)
    return data;
}

// expose the populateData function so that it can be used
// across the project
module.exports.populateData = populateData;