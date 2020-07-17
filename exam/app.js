require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const User = require("./user.model");
const Advertisement = require("./adv.model");

const express = require("express");
const app = express();

app.use(express.json());

// middleweare with authorization:
app.use(async (req, res, next) => {
  const authorization = (req.headers.authorization || "").split(" ")[1];
  if (authorization) {
    const [username, password] = authorization.split(":");
    req.user = await User.findOne({ username, password });
  }
  next();
});

//post users:
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send(user);
});

// get all users:
app.get("/users", async (req, res) => {
  const user = await User.find(req.query);
  res.send(user);
});

// post advertisements:
app.post("/advertisements", async (req, res) => {
  const advertisement = new Advertisement(req.body);
  await advertisement.save();
  res.status(201).send(advertisement);
});

// get all advertisements:
app.get("/advertisements", async (req, res) => {
  const advertisement = await Advertisement.find(req.query).populate("user");
  res.send(advertisement);
});

// get advertisement by ID:
app.get("/advertisements/:id", async (req, res) => {
  const { id } = req.params;
  const advertisement = await Advertisement.findById(id).populate("user");
  res.send(advertisement);
});

// get advertisement by title:
app.get("/advertisements/title/:title", async (req, res) => {
  const { title } = req.params;
  const advertisement = await Advertisement.find({ title }).populate("user");
  res.send(advertisement);
});

// get advertisement by category:
app.get("/advertisements/category/:category", async (req, res) => {
  const { category } = req.params;
  const advertisement = await Advertisement.find({ category }).populate("user");
  res.send(advertisement);
});

// get advertisement by price:
// app.get("/advertisements/price/:option/:price", async (req, res) => {
//   const { option, price } = req.params;
//   switch (option)

//   const advertisement = await Advertisement.find({ title }).populate("user");
//   res.send(advertisement);
// });

//update advertisement by ID:
app.put("/advertisements/:id", async (req, res) => {
  const { id } = req.params;
  const advertisement = await Advertisement.findByIdAndUpdate(
    id,
    req.body
  ).populate("user");
  res.send(advertisement);
});

//delete advertisement by ID:
app.delete("/advertisements/:id", async (req, res) => {
  const { id } = req.params;
  await Advertisement.findByIdAndDelete(id);
  res.status(200).send(`adv nr:${id} deleted`);
});

app.listen(4000, () => console.log("server started"));

// (async () => {
//   const advertisement = new Advertisement({
//     title: "Teddy bear",
//     category: "toys",
//     active: true,
//     price: "20PLN",
//   });

//   advertisement.active = false;

//   await advertisement.save();

//   const advertisements = await Advertisement.find();
//   console.log(advertisements);

//   const user = new User({
//     firstName: "Jan",
//     lastName: "Nowak",
//   });
//   await user.save();

//   const advertisementFord = await Advertisement.findById(
//     "5f10b28f5f0a236dffcc06ce"
//   );

//   advertisementFord.user = user;

//   //   advertisementFord.active = false;

//   await advertisementFord.save();

//   console.log(
//     await Advertisement.find({ active: true, title: "Nissan Patrol" }).populate(
//       "user"
//     )
//   );
// })();
