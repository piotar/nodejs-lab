require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("users", {
  firstName: String,
  lastName: String,
});

const Task = mongoose.model("tasks", {
  task: String,
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

(async () => {
  const task = new Task({
    task: "kupić czekoladę",
    complete: false,
  });

  await task.save();

  // const tasks = await Task.find();
  //   console.log(tasks);
})();
