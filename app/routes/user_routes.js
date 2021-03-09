const { ObjectId } = require('bson');

module.exports = function(app, db) {
  var ObjectID = require('mongodb').ObjectID;
  const myDB = db.db('TechWebShop');
  app.post('/create-user', (req, res) => {
    req.on('data', function (data) {
      data._id = new ObjectId()
      myDB.collection('users').insertOne(JSON.parse(data), (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send({'status':'user added'});
        } 
      })
    });
  })
  app.get('/login-user/:email/:password', (req, res) => {
    myDB.collection('users').findOne({email: req.params.email, password: req.params.password}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        if (item === null) {
          res.sendStatus(404)
        } else {
          res.send(item);
        }
      } 
    })
  })
}