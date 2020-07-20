require("dotenv").config();

const atob = require("atob");
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
const authorizationMiddleweare = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).send("access denied - no authorization data");
  } else {
    const [username, password] = atob(authorization.split(" ")[1]).split(":");
    if (username && password) {
      const user = await User.findOne({ username, password });
      if (user) {
        next();
      } else {
        res.status(401).send("access denied - passowrd or user wrong");
      }
    } else {
      res.status(401).send("access denied - wrong authorization format");
    }
  }
};

//post users:
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch {
    res.status(418).send("error: can't post user");
  }
});

// get all users:
app.get("/users", async (req, res) => {
  try {
    const user = await User.find(req.query);
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send("error: can't get users");
  }
});

// post advertisements:
app.post("/advertisements", async (req, res) => {
  try {
    const advertisement = new Advertisement(req.body);
    await advertisement.save();
    res.status(201).send(advertisement);
  } catch (err) {
    res.status(418).send("can't post advertisement");
  }
});

// get all advertisements:
app.get("/advertisements", async (req, res) => {
  try {
    const advertisement = await Advertisement.find(req.query).populate("user");
    res.status(200).send(advertisement);
  } catch (err) {
    res.status(404).send("cannot get advertisements");
  }
});

// get advertisement by ID:
app.get("/advertisements/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const advertisement = await Advertisement.findById(id).populate("user");
    res.status(200).send(advertisement);
  } catch (err) {
    res.status(404).send(`cannot get ad with given ID`);
  }
});

// get advertisement by title:
app.get("/advertisements/title/:title", async (req, res) => {
  const { title } = req.params;
  try {
    const advertisement = await Advertisement.find({ title }).populate("user");
    res.status(200).send(advertisement);
  } catch (err) {
    res.status(404).send(`cannot get advertisement`);
  }
});

// get advertisement by category:
app.get("/advertisements/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const advertisement = await Advertisement.find({ category }).populate(
      "user"
    );
    res.status(200).send(advertisement);
  } catch (err) {
    res.status(404).send("cannot get advertisement");
  }
});

// get advertisement by user ID:
app.get("/advertisements/userid/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const advertisement = await Advertisement.find({
      user: { _id: id },
    }).populate("user");
    res.status(200).send(advertisement);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

// get advertisement by price:
// grater or equal: option=gte
// equal: option=eq
// smaller or equal: option=lte
app.get("/advertisements/price/:option/:price", async (req, res) => {
  const { option, price } = req.params;
  try {
    switch (option) {
      case "gte":
        advertisement = await Advertisement.find({
          price: { $gte: price },
        }).populate("user");
        break;
      case "lte":
        advertisement = await Advertisement.find({
          price: { $lte: price },
        }).populate("user");
        break;
      case "eq":
        advertisement = await Advertisement.find({
          price: { $eq: price },
        }).populate("user");
        break;
      default:
        res.status(400).send("please send one of possible options: gte/eq/lte");
    }
    res.status(200).send(advertisement);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//update advertisement by ID:
app.put("/advertisements/:id", authorizationMiddleweare, async (req, res) => {
  const { id } = req.params;
  try {
    const advertisement = await Advertisement.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("user");
    res.status(200).send(advertisement);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//delete advertisement by ID:
app.delete(
  "/advertisements/:id",
  authorizationMiddleweare,
  async (req, res) => {
    const { id } = req.params;
    try {
      await Advertisement.findByIdAndDelete(id);
      res.status(200).send(`adv nr:${id} deleted`);
    } catch (err) {
      res.status(404).send(err.message);
    }
  }
);

//add more than one category possible to add
//sort and find by date: https://mongoosejs.com/docs/tutorials/dates.html

app.listen(4000, () => console.log("server started at port: 4000"));
