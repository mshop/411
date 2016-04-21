var mongoose = require('mongoose');


var PartySchema = new mongoose.Schema({
    //id: String,              // party id
    song_ids: [{            // changed to an object with 2 different values: songid and votes; may need to be changed to the entire song object + votes
        songid : String,
        votes : Number
    }],
    user_ids: Array,     // array of user id's that have joined the party
    host_id: String

});


var Party = mongoose.model('Party', PartySchema);

module.exports = Party;
