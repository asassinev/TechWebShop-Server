const productRoutes = require('./product_routes');
module.exports = function(app, db) {
  productRoutes(app, db);
  // Тут, позже, будут и другие обработчики маршрутов 
};