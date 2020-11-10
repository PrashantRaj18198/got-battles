const mongoose = require('mongoose');

const BattleSchema = new mongoose.Schema({
    name: String,
    year: String,
    battle_number: String,
    attacker_king: String,
    attackers: [String],
    defenders: [String],
    attacker_outcome: String,
    battle_type: String,
    major_death: String,
    major_capture: String,
    attacker_size: String,
    defender_size: String,
    attacker_commander: String,
    defender_commander: String,
    summer: String,
    location: String,
    region: String,
    note: String
})

const Battle = mongoose.model("Battle", BattleSchema);
module.exports = Battle;