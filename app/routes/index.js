const productRoutes = require('./product_routes');
const userRoutes = require('./user_routes');
module.exports = function(app, db) {
  productRoutes(app, db);
  userRoutes(app, db);
};