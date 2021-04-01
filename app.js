const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const db             = require('./config/db');
const app            = express();
var cors = require ('cors');
app.use(cors({
    origin:['http://localhost:8080','http://127.0.0.1:8080', "https://asassinev.github.io", "https://tech-web-shop-server.herokuapp.com/"],
    credentials:true
}));
const port = 8000;
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
MongoClient.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})