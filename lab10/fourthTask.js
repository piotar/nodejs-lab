const express = require("express");
const app = express();
const fs = require("fs");

const isTextMiddleware = (req, res, next) => {
  fs.readFile(`./static/${req.params.name}.txt`, "utf8", (err, data) => {
    if (err) {
      next(new Error("File does not exist"));
    } else {
      req.readData = data;
      next();
    }
  });
};

app.get("/:name", isTextMiddleware, (req, res) => {
  const content = req.readData;
  res.send(content);
});

app.use((error, req, res, next) => {
  res.send(error.message);
  console.log(error.message);
});

app.listen(4000, () => console.log("start server"));

// const express = require("express");
// const app = express();
// const util = require("util");
// const fs = require("fs");
// const readFileAsync = util.promisify(fs.readFile);

// app.get("/:path", async (req, res, next) => {
//   const { path } = req.params;

//   try {
//     const contentFile = await readFileAsync(`./static/${path}`, "utf8");
//     res.send(contentFile);
//   } catch (e) {
//     next(e);
//   }
// });

// app.use((error, req, res, next) => {
//   res.send(error.message);
//   console.log(error.message);
// });

// app.listen(4000, () => console.log("start server"));
