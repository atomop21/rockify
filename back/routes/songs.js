const router = require("express").Router();
const song = require("../model/songs");
const Album = require("../model/album");


router.post("/new", async (req, res) => {
  const newSong = song({
    name: req.body.name,
    imageURL: req.body.imageURL,
    songURL: req.body.songURL,
    album: req.body.album,
    artist: req.body.artist,
    language: req.body.language,
    category: req.body.category,
  });

  try {
    const savedSong = await newSong.save();
    return res.status(200).send({ success: true, sng: savedSong });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
});

router.get("/getsong/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const songdata = await song.findOne(filter);

  if (songdata) {
    return res.status(200).send({ success: true, sng: songdata });
  } else {
    return res.status(400).send({ success: false, sng: "not found" });
  }
});

router.get("/getAll", async (req, res) => {
  const allsong = await song.find();

  if (allsong.length) {
    return res.status(200).send({ success: true, songs: allsong });
  } else {
    return res.status(400).send({ success: false, sng: "not found" });
  }
});

router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const options = {
    upsert: true,
    new: true,
  };

  try {
    const savedSong = await song.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        songURL: req.body.songURL,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
      },
      options
    );
    return res.status(200).send({ success: true, sng: savedSong });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
});

router.delete("/delsng/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const del = await song.deleteOne(filter);

  if (del) {
    return res.status(200).send({ success: true, sng: "song  deleted" });
  } else {
    return res.status(400).send({ success: false, sng: "not found" });
  }
});

router.get("/songsByAlbum/:albumName", async (req, res) => {
  const albumName = req.params.albumName;
  try {
    // Find the album by its name
    const album = await Album.findOne({ name: { $regex: new RegExp(albumName, "i") } });

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    // Fetch songs associated with the album using the populate method
    const songs = await song.find({ album: albumName });

    res.json({ albumsongs: songs });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/songsByArtist/:artName", async (req, res) => {
  const artistname = req.params.artName;
  try {
   
    const songs = await song.find({ artist: { $regex: new RegExp(artistname, "i") }});

    res.json({ artistsongs: songs });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
