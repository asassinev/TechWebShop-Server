const productRoutes = require('./product_routes');
const userRoutes = require('./user_routes');
const orderRoutes = require('./order_routes');
module.exports = function(app, db) {
  app.get('/', (req, res) => {
    res.send('ok')
  })
  app.post('/catalog', (req, res) => {
    const myDB = db.db('TechWebShop');
    myDB.collection('catalog').findOne({categories: req.body.categories}, (err, item) => {
      if (err) {
        res.send({'error': 'An error has occurred'})
      } else {
        res.send(item)
      }
    })
  })
  productRoutes(app, db);
  userRoutes(app, db);
  orderRoutes(app, db);
};