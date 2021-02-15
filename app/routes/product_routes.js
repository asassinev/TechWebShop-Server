module.exports = function(app, db) {
  var ObjectID = require('mongodb').ObjectID;
  const myDB = db.db('TechWebShop')
  app.get('/productList', (req, res) => {
    myDB.collection('Product').find(req.query).toArray((err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });
  app.get('/productInfo/:id', (req, res) => {
    const details = { '_id':  new ObjectID(req.params.id) };
    myDB.collection('Product').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });
};