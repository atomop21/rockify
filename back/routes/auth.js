const { decrypt } = require("dotenv");
const admin = require("../config/firebase.config");
const user = require("../model/user");

const router = require("express").Router();

router.get("/login", async (req, res) => {
  if (!req.headers.authorization) {
    res.status(500).send({ message: "Invalid token" });
  }
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodeval = await admin.auth().verifyIdToken(token);
    if (!decodeval) {
      return res.status(505).send({ message: "Unauthorized" });
    } else {
      const userexist = await user.findOne({ user_id: decodeval.user_id });
      if (!userexist) {
        newUserData(decodeval, req, res);
      } else {
        updateUser(decodeval, req, res);
      }
    }
  } catch (error) {
    return res.status(505).send({ message: error });
  }
});

const newUserData = async (decodeval, req, res) => {
  const newUser = new user({
    name: decodeval.name,
    email: decodeval.email,
    imageurl: decodeval.picture,
    user_id: decodeval.user_id,
    email_verified: decodeval.email_verified,
    role: "member",
    authtime: decodeval.auth_time,
  });

  try {
    const saveuser = await newUser.save();
    res.status(200).send({ user: saveuser });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
};

const updateUser = async (decv, req, res) => {
  const filter = { user_id: decv.user_id };

  const options = {
    upsert: true,
    new: true,
  };
  const update = { authtime: decv.auth_time };

  try {
    const result = await user.findOneAndUpdate(filter, update, options);
    res.status(200).send({ user: result });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
};

router.get("/getusers", async (req, res) => {
  const allusers = await user.find();
  if (allusers) {
    res.status(200).send({ success: true, data: allusers });
  } else {
    res.status(400).send({ success: false, message: "Data not found" });
  }
});

router.put("/updateRole/:userid", async (req, res) => {
  const filter = { _id: req.params.userid };
  const role = req.body.role;
  // console.log(role);
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await user.findOneAndUpdate(filter, { role: role }, options);
    res.status(200).send({ user: result });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
});

router.delete("/delusr/:userid", async (req, res) => {
  const filter = { _id: req.params.userid };
  const del = await user.deleteOne(filter);

  if (del.deletedCount === 1) {
    return res.status(200).send({ success: true, msg: "user  deleted" });
  } else {
    return res.status(400).send({ success: false, user: "not found" });
  }
});

module.exports = router;
