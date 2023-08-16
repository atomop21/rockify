const router = require("express").Router();

const album = require("../model/album");

router.post("/new", async (req, res) => {
  const newAlbum = album({
    name: req.body.name,
    imageURL: req.body.imageURL,
  });

  try {
    const savedAlb = await newAlbum.save();
    return res.status(200).send({ success: true, alb: savedAlb });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
});

router.get("/getalb/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const albdata = await album.findOne(filter);

  if (albdata) {
    return res.status(200).send({ success: true, alb: albdata });
  } else {
    return res.status(400).send({ success: false, alb: "not found" });
  }
});

router.get("/getAll", async (req, res) => {
  const allalb = await album.find();

  if (allalb) {
    return res.status(200).send({ success: true, alb: allalb });
  } else {
    return res.status(400).send({ success: false, alb: "not found" });
  }
});

router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const options = {
    upsert: true,
    new: true,
  };

  try {
    const savedAlb = await album.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
      },
      options
    );
    return res.status(200).send({ success: true, artist: savedAlb });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
});

router.delete("/delalb/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const del = await album.deleteOne(filter);

  if (del) {
    return res.status(200).send({ success: true, artist: "artist  deleted" });
  } else {
    return res.status(400).send({ success: false, artist: "not found" });
  }
});

module.exports = router;
