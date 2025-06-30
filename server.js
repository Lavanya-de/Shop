let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let cors = require('cors'); // ✅ Added CORS

let app = express();

// ✅ Middleware
app.use(cors()); // ✅ Enable Cross-Origin Resource Sharing
app.use(express.static(__dirname)); // ✅ Serve static files (index.html, images, etc.)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Serve index.html at root
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Serve profile picture
app.get('/profile-picture', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, { 'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

// MongoDB connection
let mongoUrlLocal = "mongodb://admin:password@localhost:27017";
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
let databaseName = "my-db";

// ✅ Update profile API
app.post('/update-profile', function (req, res) {
  let userObj = req.body;
  userObj['userid'] = 1;

  MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);
    let myquery = { userid: 1 };
    let newvalues = { $set: userObj };

    db.collection("users").updateOne(myquery, newvalues, { upsert: true }, function (err) {
      if (err) throw err;
      client.close();
    });

    // Send response immediately
    res.send(userObj);
  });
});

// ✅ Get profile API
app.get('/get-profile', function (req, res) {
  var response=res;
  MongoClient.connect('mongodb://admin:password@localhost:27017',function(err,client){
    if(err) throw err;
    var db=client.db('user-account');
    var query={userid:1};
    db.collection('users').findOne(query,function(err,result){
      if(err) throw err;
      client.close();
      response.send(result);
    });
  });
});

// ✅ Start server
app.listen(3001, function () {
  console.log("app listening on port 3001!");
});
