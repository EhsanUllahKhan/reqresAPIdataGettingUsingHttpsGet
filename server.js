const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const https = require('https');

app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    https.get('https://reqres.in/api/users?page=2', (res) => {
        // console.log('statusCode:', res.statusCode);
        // console.log('headers:', res.headers);
        // console.log(res)
        res.on('data', (d) => {
            const buf = Buffer.from(d);
            console.log(buf.toString('utf8'))
            res.send(`<sicz>`)
            // res.json((d));
        });

    }).on('error', (e) => {
        console.error(e);
    });

    // res.send("<h1>ReqRes get API</h1>")
})

app.get("/user/:id", (req, res) => {
    const accountId = Number(req.params.id);
    //console.log(accountId)
    var url = 'https://reqres.in/api/users/' + accountId;
    //console.log(url);

    https.get(url, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', (d) => {
            process.stdout.write(String(d));
        });

    }).on('error', (e) => {
        console.error(e);
    });

    res.send('id: ' + accountId)
})


app.listen(3000, () => {
    console.log("\tServer Listening at port 3000\t");
})