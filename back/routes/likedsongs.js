const express = require("express");
const router = express.Router();
const liksngmod = require('../model/likedsongs');

router.get("/song/:userid", async (req, res) => {
    const usr = req.params.userid;
    const songs = await liksngmod.find({ user_id: usr });

    if (!songs) {
        res.status(404).send({ message: "No liked songs" });
    } else {
        res.status(200).send({ likedsongs: songs });
    }
});

router.post("/new/:userid", async (req, res) => {
    const newSong = liksngmod({
        name: req.body.name,
        imageURL: req.body.imageURL,
        songURL: req.body.songURL,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
        user_id: req.params.userid  // Corrected parameter name
    });

    try {
        const savedSong = await newSong.save();
        return res.status(200).send({ success: true, sng: savedSong });
    } catch (error) {
        res.status(400).send({ success: false, message: error });
    }   
});

router.delete("/song/:userid/:songname", async (req, res) => {
    const filter = { user_id: req.params.userid, name: req.params.songname };  // Corrected parameter name

    const del = await liksngmod.deleteOne(filter);

    if (del) {
        return res.status(200).send({ success: true, sng: "song deleted" });
    } else {
        return res.status(400).send({ success: false, sng: "not found" });
    }
});

module.exports = router;
