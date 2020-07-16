require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Task = mongoose.model("tasks", {
  task: String,
  completed: Boolean,
});

(async () => {
  const task = new Task({
    task: "kupić czekoladę",
    complete: false,
  });

  await task.save();

  //   const tasks = await Task.find();
  //   console.log(tasks);
})();
