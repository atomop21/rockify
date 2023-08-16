const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv/config");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*", credentials: true, allowedHeaders: "*" }));
app.use(express.json());

mongoose.connect(process.env.DB_CON, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("conected"))
  .on("error", (err) => console.log(err));

app.get("/", (req, res) => {
  res.json("hello world");
});

// app.use(cors({credentials:true, origin:"http://localhost:3000"}));
app.listen(4000, () => console.log("Listening 4000"));

//user routes
const userRoute = require("./routes/auth");
app.use("/api/user/", userRoute);

//artist routes
const artistRoutes = require("./routes/artist");
app.use("/api/artist/", artistRoutes);

//album routes
const albumRoutes = require("./routes/album");
app.use("/api/album", albumRoutes);

//songs  routes
const songRoutes = require("./routes/songs");
app.use("/api/songs/", songRoutes);

//liked songs routes
const likedsong=require("./routes/likedsongs");
app.use("/api/likedsongs", likedsong)

const playlist=require("./routes/playlist");
app.use("/api/play/", playlist)