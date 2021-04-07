const { ObjectId } = require('bson');

module.exports = function(app, db) {
  var ObjectID = require('mongodb').ObjectID;
  const myDB = db.db('TechWebShop');
  app.get('/productList/:categories', (req, res) => {
    myDB.collection('product').find({'categories': req.params.categories}).toArray((err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        var newArray = []
        item.forEach(e => {
          newArray.push({_id: e._id, imgSrc: e.imgSrc, name: e.name, titleDescription: e.titleDescription, price: e.price, reviews: e.reviews})
        })
        res.send(newArray);
      } 
    });
  });
  app.get('/productInfo/:id', (req, res) => {
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
    req.body.id = new ObjectID()
    myDB.collection('product').updateOne(details, { $push: { reviews: req.body }}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send({'status':'review added'});
      } 
    })
  })
  app.post('/create-comment', (req, res) => {
    const details = { '_id': new ObjectID(req.body.id) };
    var id = req.body.reviewId
    myDB.collection('product').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        item.reviews.forEach(e => {
          if (e.id.toString() === id.toString()) {
            e.comments.push(req.body)
          }
        });
        myDB.collection('product').updateOne(details, {$set: item}, (err, item) => {
          if (err) {
              res.send({'error':'An error has occurred'});
            } else {
              res.send({'status':'comment added'});
            } 
        })
      }
    })
  })
};