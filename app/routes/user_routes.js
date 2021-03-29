const { ObjectId } = require('bson');

module.exports = function(app, db) {
  var ObjectID = require('mongodb').ObjectID;
  const myDB = db.db('TechWebShop');
  app.post('/create-user', (req, res) => {
    req.on('data', function (data) {
      myDB.collection('users').findOne({email: JSON.parse(data).email}, (err, item) => {
        if (item !== null || err) {
          return res.status(302).send({
            error: 'Email already exists'
         });
        } else {
          data._id = new ObjectId()
          myDB.collection('users').insertOne(JSON.parse(data), (err, item) => {
            if (err) {
              res.send({'error':'An error has occurred'});
            } else {
              res.send({'status':'user added'});
            } 
          })
        }
      })
    })
  })
  app.get('/login-user/:email/:password', (req, res) => {
    myDB.collection('users').findOne({email: req.params.email, password: req.params.password}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        if (item === null) {
          res.status(404).send({error: 'Username or password is incorrect'})
        } else {
          res.send(item);
        }
      } 
    })
  })
  app.post('/change-user', (req, res) => {
    req.on('data', function (data) {
      const details = { '_id': new ObjectID(JSON.parse(data)._id) };
      var user = JSON.parse(data)
      myDB.collection('users').updateOne(details,{$set: {email: user.email, firstName: user.firstName, secondName: user.secondName, sex: user.sex, phone: user.phone}}, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send({'status':'User updated'});
        } 
      })
    });
  })
  app.post('/change-user-password', (req, res) => {
    req.on('data', function(data) {
      const details = { '_id': new ObjectID(JSON.parse(data)._id) };
      myDB.collection('users').updateOne(details, {$set: {password: JSON.parse(data).password}}, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'})
        } else {
          res.send({'status':'User updated'});
        }
      })
    })
  })
}