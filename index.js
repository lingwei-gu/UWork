'use strict';

const express = require('express');
const spawn = require('child_process').spawn;
const cron = require("node-cron");
const path = require('path');
const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
    port = 5000;
}
const Job_db = require('./mongo_init');
var bodyParser = require('body-parser');

cron.schedule("0 17 * * *", function() {
    console.log("Scraper Activated 5pm");
    spawn('python3', ['scrape_data/gain_postings.py']);
});

cron.schedule("0 13 * * *", function() {
    console.log("Scraper Activated 1pm");
    spawn('python3', ['scrape_data/gain_postings.py']);
});
cron.schedule("0 15 * * *", function() {
    console.log("Scraper Activated 3pm");
    spawn('python3', ['scrape_data/gain_postings.py']);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'client/build')));
if(process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, 'client/build')));  
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname = 'client/build/index.html'));  
    });
    app.get('/job-search', (req, res) => {    
        res.sendFile('client/build/index.html', { root: __dirname });
    });
}

app.get('/', (req, res) => {    
    res.sendFile(path.join(__dirname = 'client/build/index.html'));  
});

app.get('/job-search', (req, res) => {    
    res.sendFile('client/build/index.html', { root: __dirname });
});


app.use('/express_backend_sort', (req,res) => {
    var db_operation = new Job_db();
    if (req.method == 'POST') {
        db_operation.find_post_sort(req.body.params[0], req.body.params[1])
        .then((result) => {
            console.log("Sort (post) API called");
            res.send({express: result});
        });
    }
});

app.use('/express_backend_count', (req,res) => {
    var db_operation = new Job_db();
    db_operation.find_post_count(req.body.params).then((result) => {
        //console.log(res);
        console.log("Count API called");
        //result = result.toString();
        res.send({express: result});
    });
});

app.use('/express_backend', (req, res) => {
    //var dataToSend;
    //var new_data;
    //var mongo = require('mongodb');
    var db_operation = new Job_db();
    if (req.method == 'GET') {
        db_operation.find_post({}).then((result) => {
            //console.log(res);
            console.log("Data (get) API called");
            //result = result.toString();
            res.send({express: result});
        });
    } 
    if (req.method == 'POST') {
        
        db_operation.find_post(req.body.params).then((result) => {
            //console.log(res);
            console.log("Data (post) API called");
            //result = result.toString();
            res.send({express: result});
        });
    } 
    
    /*
    // spawn new child process to call the python script
    //const python = spawn('python3', ['scrape_data/gain_postings.py']);
    console.log('Pipe data from python script ...');
    const python = spawn('python3', ['scrape.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        var temp_data = dataToSend.charAt(0);
        var post_length = dataToSend.length;

        // parse the string from python script character by character
        for (var i = 1; i < post_length; i++) {
            temp_data = temp_data.concat(dataToSend.charAt(i));
        }
        //console.log("Before split \n\n\n\n\n\n\n\n\n\n");
        //console.log(temp_data);
        // split the whole into an array of objects that can be parsed as valid JSON format data
        temp_data = temp_data.slice(0,-3);
        temp_data = temp_data.split("_!_");
        
        // parse into javascript objects
        var db_operation = new Post_db();
        var posting_num = temp_data.length;
        //temp_data[posting_num-1] = temp_data[posting_num-1].slice(0,-3);

        
        var posting = null;
        //console.log("starttttt");
        for (var i = 0; i < posting_num; i++) {
            if (temp_data[i] == "") {
                continue;
            }
            posting = JSON.parse(temp_data[i]);
            //db_operation.insert_post(posting);
            console.log(i + "th entry parsed");
            //console.log(posting.posting_id);
        }
        
        //console.log(new_data);


        //console.log(dataToSend)
        //console.log(posting);
        //var db_operation = new Post_db();
        //db_operation.insert_post(posting);
        //db_operation.find_post();
        //db_operation.drop_table();
    });
    */
    
    // in close event we are sure that stream from child process is closed

    /*
    python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    //res.send(dataToSend);
    res.send({express: new_data});
    });
    */
    
});
app.listen(port, () => console.log(`Server Started on port ${port}!`));

/*
//concurrent scraping by Python and Selenium and Beautiful Soup
//mongodb for data storage and caching
//front end: react(redux) etc
//back end:  Node.js | MongoDB | Express | Rest APIs | AJAX (Async) | Google Cloud

//level, city, province, country, 4/8 month, deadline, software, RegExp for compensation
*/