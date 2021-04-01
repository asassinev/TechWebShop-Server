const { ObjectId } = require('bson');

module.exports = function(app, db) {
  var ObjectID = require('mongodb').ObjectID;
  const myDB = db.db('TechWebShop');
  app.post('/create-order', (req, res) => {
    res.body._id = new ObjectId()
    myDB.collection('orders').insertOne(res.body, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send({'status':'Order added'});
      } 
    })
  })
  app.post('/get-orders', (req, res) => {
    myDB.collection('orders').find({email: req.body.email, phone: req.body.phone}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        if (item === null) {
          res.status(404).send({error: 'Nothing'})
        } else {
          res.send(item);
        }
      }
    })
  })
}