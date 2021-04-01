const productRoutes = require('./product_routes');
const userRoutes = require('./user_routes');
const orderRoutes = require('./order_routes');
module.exports = function(app, db) {
  app.get('/', (req, res) => {
    res.send('ok')
  })
  productRoutes(app, db);
  userRoutes(app, db);
  orderRoutes(app, db);
};