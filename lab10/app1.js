const express = require("express");
const app = express();

console.log("pug");
//test
app.set("view engine", "pug");


app.get("/:name?", (req, res) => {
    const { name = "world" } = req.params;

    res.render("index", {
        title: "hello",
        message: `Hello ${name}!`
    })
})

app.listen(4000, () => console.log("start server"));