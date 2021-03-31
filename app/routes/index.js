const productRoutes = require('./product_routes');
const userRoutes = require('./user_routes');
const orderRoutes = require('./order_routes');
module.exports = function(app, db) {
  productRoutes(app, db);
  userRoutes(app, db);
  orderRoutes(app, db);
};