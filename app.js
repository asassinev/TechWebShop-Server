const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const app            = express();
const cors           = require ('cors');
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.set('MongoDB_URL', (process.env.MONGODB_URL || require('./config/db')))
app.set('port', (process.env.PORT || 5000));
MongoClient.connect(app.get('MongoDB_URL'), {useNewUrlParser: true, useUnifiedTopology: true}, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(app.get('port'), () => {
    console.log('We are live on ' + app.get('port'));
  });
})