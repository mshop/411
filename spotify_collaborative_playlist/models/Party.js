var mongoose = require('mongoose');


var PartySchema = new mongoose.Schema({
    //id: String,              // party id
    song_ids: Array,    // array of song id's (might need to be an array of tuples, which will be of the form: (song_id, votes))
    user_ids: Array     // array of user id's that have joined the party

});


var Party = mongoose.model('Party', PartySchema);

module.exports = Party;
