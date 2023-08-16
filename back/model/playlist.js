const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    user_id:{
        type:String,
        required:true,
    },
    songs:{
        type:Array,
        required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("playlist", playlistSchema);