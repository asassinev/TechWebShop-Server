module.exports = function(app, db) {
  var ObjectID = require('mongodb').ObjectID;
  const myDB = db.db('TechWebShop');
  app.get('/productList', (req, res) => {
    console.log(req.query.categories);
    myDB.collection('product').find({'categories': req.query.categories}).toArray((err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });
  app.get('/productInfo/:id/', (req, res) => {
    const details = { '_id':  new ObjectID(req.params.id) };
    myDB.collection('product').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });
  app.get('/getCharacteristics/:categories', (req, res) => {
    const details = { 'categories': req.params.categories };
    myDB.collection('rating-characteristics').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item.items);
      } 
    })
  })
  app.post('/create-review/:id', (req, res) => {
    const details = { '_id': new ObjectID(req.params.id) };
    console.log('here');
    req.on('data', function (data) {
      myDB.collection('product').updateOne(details, { $push: { reviews: JSON.parse(data) }}, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send({'status':'product updated'});
        } 
      })
    });
  })
};