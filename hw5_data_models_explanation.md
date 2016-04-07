This is our schema for a Spotify search result, which we store to make our search function faster. All fields expect duration_ms take String values, because this is what is returned by Spotify itself


var searchResultSchema = new mongoose.Schema({
    search_href: String, #the link to the search that the song was included in 
    song_href: String, #the link to the song itself
    artists: String, #the name of the artist(s) for the song
    duration_ms: Number, #the time of the song in milliseconds
    name: String, #the name of the song
    id: String #the id that the song has been assigned by Spotify
    _id: String #The mongo unique string identifier for the document
});

