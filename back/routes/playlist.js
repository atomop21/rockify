const express = require("express");
const router = express.Router();
const Playlist = require("../model/playlist");

router.get("/:user_id/playlists/:name", async (req, res) => {
    try {
      const { user_id, name } = req.params;
      const playlist = await Playlist.findOne({ user_id, name });
      res.status(200).json({playlist:playlist});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  router.get("/:user_id/playlists", async (req, res) => {
    try {
      const { user_id } = req.params;
      const playlists = await Playlist.find({ user_id });
      res.status(200).json({playlists:playlists});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.put("/:user_id/update/:name", async (req, res) => {
    try {
      const filter={user_id:req.params.user_id,name:req.params.name}
      const { songs } = req.body;
      
  
      const updplay = await Playlist.findOneAndUpdate(
        filter,
        { songs:songs } , // Use $set to update the songs field
      );
  
      if (!updplay) {
        
        return res.status(404).json({ message: "Playlist not found" });
       
      }
  
      res.status(200).json({ message: "Playlist songs updated successfully", playlist: updplay });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

  router.delete("/:user_id/delete/:name", async (req, res) => {
    try {
      const { user_id, name } = req.params;
      await Playlist.findOneAndDelete({ user_id, name });
      res.status(200).json({ message: "Playlist deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post("/:user_id/create", async (req, res) => {
    try {
      const { name, imageURL } = req.body;
      const { user_id } = req.params;
      const playlist = new Playlist({
        name,
        imageURL,
        user_id,
        songs: [],
      });
      const savedPlaylist = await playlist.save();
      res.status(201).json({savedPlaylist:savedPlaylist});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;