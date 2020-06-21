const express = require('express');
const app = express();
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

app.get('/:path', async (req, res, next) => {
    try {
        const { path } = req.params;
        // console.log(path)
        // const data = await (readFileAsync(`./static/${path}`, 'utf-8'));
        // data && res.send(data);
        const contentFile = await readFileAsync(`./static/${path}`, 'utf-8');
        res.send(contentFile);
    } catch (e) {
        next(e)
    }
});

app.use((error, req, res, next) => {
    console.log(error.message);
    // throw error
    res.send("error");
});
app.listen(4300, () => console.log('start server'));