require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require("./user.model");
const Advertisement = require("./adv.model");

const express = require("express");
const app = express();

app.use(express.json());

app.get("/advertisements", async (req, res) => {
  const advertisement = await Advertisement.find(req.query);
  res.send(advertisement);
});

app.post("/advertisements", async (req, res) => {
  const advertisement = new Advertisement(req.body);
  await advertisement.save();
  res.status(201).send(advertisement);
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
