const express = require('express');
require('dotenv').config();
request = require('request');
var url = require('url');
const https = require('https');
const http = require('http');

const app = express();
//Required modules
const ipfsAPI = require('ipfs-api');
const fs = require('fs');

const bodyParser = require('body-parser');
const logger = require('morgan');
  
   var count;
   var nounce;
   var errcode="";

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, x-access-token');
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/ping", function(req, res){
  res.json({ messaage: "pong" });
});

//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('127.0.0.1', '5001', {protocol: 'http'})

function savefile(filename, url) {

    const file = fs.createWriteStream(filename);
    const request = https.get(url, function(response) {
      response.pipe(file);
	    console.log("file saved");
	    return file;
    });;
}


function saveBuffer(url) {

	const request = https.get(url, function(response) {
      response.pipe(file);
            console.log("file saved");
            return file;
    });;

}

function getBuffer(filename, url) {
    const options = {
       url: url,
       encoding: null
    };

    request.get(options)
       .then(function (res) {
       const buffer = Buffer.from(res, 'utf8');
       return buffer;
     //    fs.writeFileSync(filename, buffer);
    });
}

async function savefileWithPromise(filename, url) {
    return new Promise((resolve, reject) => {

        // Create file and setup close handler.
        const file = fs.createWriteStream(filename)
            .on('close', () => resolve("File end"));

        // Read data from url..the file.close handler will fire when the response has been piped to the file stream.
        https.get(url, function(response) {
            response.pipe(file);
        });
    });
}

function readUrlDataToBuffer(url) {
	console.log("url " + url);
    return new Promise((resolve, reject) => {
        https.get(url, function(response) {
            const data = [];
            response.on('data', function(chunk) {
                data.push(chunk);
            }).on('end', function() {
                resolve(Buffer.concat(data));
            })
        }).on('error', function(err) {
            reject(err);
        });
    });
}

app.post('/addfileb', async function(req, res) {
    try {
        var url = req.body.url;
        console.log(`/addfile: Reading from url: ${url}..`);
        let buffer = await readUrlDataToBuffer(url);
        console.log("Buffer length: " + buffer.length + " byte(s).");
    ipfs.files.add(buffer, function (err, file) {
        if (err) {
          console.log(err);
          res.json({ message: "error", error:err });

        } else {
                console.log(file);
          res.json({ message: "ok", hash: file });
        }
      })


    } catch (error) {
        res.status(500).send('An error occurred');
    }
});


//Addfile router for adding file a local file to the IPFS network without any local node
app.post('/addfile', async function(req, res) {

    var filename = req.body.filename;
    var url = req.body.url;
    await savefileWithPromise(filename, url);
    let testFile = fs.readFileSync(filename);
    let testBuffer = new Buffer(testFile);
 //   let aBuffer = getBuffer(filename, url);
    ipfs.files.add(testBuffer, function (err, file) {
        if (err) {
          console.log(err);
          res.json({ message: "error", error:err });

        } else {
		console.log(file);
          res.json({ message: "ok", hash: file });
	}
      })

})

app.post("/api/processJourney1",function(req,res){

   var custid = req.body.custid; //n//
   var longitude = req.body.longitude;
   var latitude = req.body.latitude;
   var journeytime = req.body.journeytime;

console.log(custid);
	console.log(longitude);
	console.log(latitude);
	console.log(journeytime);

});

app.post("/api/processJourney",function(req,res){


   var custid = req.body.custid; //n//
   var longitude = req.body.longitude;
   var latitude = req.body.latitude;
   var journeytime = req.body.journeytime;

    
});

app.use(express.static(__dirname + "/public" ));

app.listen(3000, function(){
  console.log("App starts at port :" +3000);
});



