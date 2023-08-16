const router = require("express").Router();

const artist = require("../model/artist");

router.post("/new", async (req, res) => {
  const newArtist = artist({
    name: req.body.name,
    imageURL: req.body.imageURL,
    twitter: req.body.twitter,
    instagram: req.body.instagram,
  });

  try {
    const savedArt = await newArtist.save();
    return res.status(200).send({ success: true, artist: savedArt });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
});

router.get("/getart/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const artdata = await artist.findOne(filter);

  if (artdata) {
    return res.status(200).send({ success: true, artist: artdata });
  } else {
    return res.status(400).send({ success: false, artist: "not found" });
  }
});

router.get("/getAll", async (req, res) => {
  const allart = await artist.find();

  if (allart.length) {
    return res.status(200).send({ success: true, artist: allart });
  } else {
    return res.status(400).send({ success: false, artist: "not found" });
  }
});

router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const options = {
    upsert: true,
    new: true,
  };

  try {
    const savedArt = await artist.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
      },
      options
    );
    return res.status(200).send({ success: true, artist: savedArt });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
});

router.delete("/delart/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const del = await artist.deleteOne(filter);

  if (del) {
    return res.status(200).send({ success: true, artist: "artist  deleted" });
  } else {
    return res.status(400).send({ success: false, artist: "not found" });
  }
});

module.exports = router;
