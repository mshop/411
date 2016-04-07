var mongoose = require('mongoose');

// var searchResultSchema = new mongoose.Schema({
//   tracks: {
//     href: String,
//     items: [{
//       href: String,
//       artists: [{ name: String}],
//       duration_ms: Number,
//       name: String,
//       id: String
//     }]
//   }
// });

var searchResultSchema = new mongoose.Schema({
    search_href: String,
    song_href: String,
    artists: String,
    duration_ms: Number,
    name: String,
    id: String
});


var SearchResult = mongoose.model('SearchResult', searchResultSchema);

module.exports = SearchResult;
