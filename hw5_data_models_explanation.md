# This is our JSON schema for a Spotify search result, which we store to make our search function faster. 
# All fields except duration_ms take (and expect) String values, because this is what is returned by Spotify itself
# Note: A JSON Schema does not allow comments, so instead, a "description" field was added that defines the attributes associated with the song object

{
    "title": "Spotify search result",
    "type": "array",
    "items": {
        "title": "Song",
        "type": "object",
        "properties": {
            "search_href": {
		     "description": "the link to the search that the song was included in",
                "type": "string"  
            },
            "song_href": {
		     "description": "the link to the song itself",
                "type": "string"  
            },
            "artists": {
		     "description": "the name of the artist(s) for the song",
                "type": "string"  
            },
            "duration_ms": {
		     "description": "the time of the song in milliseconds",
                "type": "number"  
            },
            "name": {
			"description": "the name of the song",
                "type": "string"  
            },
            "id": {
                "description": "the id that the song has been assigned by Spotify",
                "type": "string"
            },
            "_id": {
                "description": "The mongo unique string identifier for the document",
                "type": "number"
            }

	},
        "required": ["id", "name", "price"]
    }
}

