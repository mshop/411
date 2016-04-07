var mongoose = require('mongoose');

var searchSchema = new mongoose.Schema({
  tracks: {
    href: String,
    items: {
        album: {
          album_type: String,
          available_markets: { type: String, default: '' },
          external_urls: { type: String, default: '' },
          href: String,
          id: String,
          images: {
              height: Int,
              url: String,
              width: Int
            },
          name: String,
          type: String,
          uri: String
        },
        artists: 
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4dpARuHxo51G3z768sgnrY"
            },
            "href": "https://api.spotify.com/v1/artists/4dpARuHxo51G3z768sgnrY",
            "id": "4dpARuHxo51G3z768sgnrY",
            "name": "Adele",
            "type": "artist",
            "uri": "spotify:artist:4dpARuHxo51G3z768sgnrY"
          }
        ],
        "available_markets": [
          "AR",
          "BO",
          "BR",
          "CL",
          "CO",
          "CR",
          "DO",
          "EC",
          "GT",
          "HN",
          "MX",
          "NI",
          "PA",
          "PE",
          "PY",
          "SV",
          "US",
          "UY"
        ],
        "disc_number": 1,
        "duration_ms": 295493,
        "explicit": false,
        "external_ids": {
          "isrc": "GBBKS1500214"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/0ENSn4fwAbCGeFGVUbXEU3"
        },
        "href": "https://api.spotify.com/v1/tracks/0ENSn4fwAbCGeFGVUbXEU3",
        "id": "0ENSn4fwAbCGeFGVUbXEU3",
        "name": "Hello",
        "popularity": 89,
        "preview_url": "https://p.scdn.co/mp3-preview/0b90429fd554bad6785faa2b8931d613db4a0ee4",
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:0ENSn4fwAbCGeFGVUbXEU3"
      })

var User = mongoose.model('User', userSchema);

module.exports = User;
