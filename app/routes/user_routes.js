const { ObjectId } = require('bson');

module.exports = function(app, db) {
  var ObjectID = require('mongodb').ObjectID;
  const myDB = db.db('TechWebShop');
  app.post('/create-user', (req, res) => {
    myDB.collection('users').findOne({email: req.body.email}, (err, item) => {
      if (item !== null || err) {
        return res.status(302).send({
          error: 'Email already exists'
        });
      } else {
        req.body._id = new ObjectId()
        myDB.collection('users').insertOne(req.body, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send({'status':'user added'});
          } 
        })
      }
    })
  })
  app.post('/login-user', (req, res) => {
    console.log(req.body);
    myDB.collection('users').findOne({email: req.body.email, password: req.body.password}, (err, item) => {
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
    const details = { '_id': new ObjectID(req.body._id) };
    var user = req.body
    myDB.collection('users').updateOne(details,{$set: {email: user.email, firstName: user.firstName, secondName: user.secondName, sex: user.sex, phone: user.phone}}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send({'status':'User updated'});
      } 
    })
  })
  app.post('/change-user-password', (req, res) => {
    const details = { '_id': new ObjectID(req.body._id) };
    myDB.collection('users').updateOne(details, {$set: {password: req.body.password}}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'})
      } else {
        res.send({'status':'User updated'});
      }
    })
  })
}