const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const https = require('https');
const { Body } = require("node-fetch");

app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    // var data = "ad";
    // https.get('https://reqres.in/api/users?page=2', (res1) => {
    //     res1.on('data', (d) => {
    //         data = d;
    //         console.log(data);
    //     });

    // }).on('error', (e) => {
    //     console.error(e);
    // });

    // res.send("<h1>ReqRes get API</h1>")
    // console.log("Data is ", data);

    const request = require('request');
    request('https://reqres.in/api/users?page=2', function (error, response, body) {
        var data = JSON.parse(body)
        res.send(data["data"])
        // console.log(data["data"])
    });
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