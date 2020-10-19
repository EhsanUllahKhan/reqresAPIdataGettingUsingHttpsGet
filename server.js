const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const https = require('https');
const { Body } = require("node-fetch");
const request = require('request');

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


    request('https://reqres.in/api/users?page=2', function (error, response, body) {
        var data = JSON.parse(body)
        res.send(data["data"])
        // console.log(data["data"])
    });
})






app.get("/user/unknown", (req, res) => {
    var url = "https://reqres.in/api/cupcakes";
    request(url, function (error, response, body) {
        var data = JSON.parse(body)
        res.send(data)
    });
})



app.get("/user/:id", (req, res) => {
    const accountId = Number(req.params.id);
    //console.log(accountId)
    var url = 'https://reqres.in/api/users/' + accountId;
    request(url, function (error, response, body) {
        var data = JSON.parse(body)
        // console.log(data)
        res.send(data)
    });
    // //console.log(url);

    // https.get(url, (res) => {
    //     console.log('statusCode:', res.statusCode);
    //     console.log('headers:', res.headers);

    //     res.on('data', (d) => {
    //         process.stdout.write(String(d));
    //     });

    // }).on('error', (e) => {
    //     console.error(e);
    // });

    //res.send('id: ' + accountId)
    console.log(accountId)
})



app.get("/user/unknown/:id", (req, res) => {
    const accountId = Number(req.params.id);
    //console.log(accountId)
    var url = "https://reqres.in/api/unknown/" + accountId;
    request(url, function (error, response, body) {
        var data = JSON.parse(body)
        res.send(data)
    });
})

app.listen(3000, () => {
    console.log("\tServer Listening at port 3000\t");
})