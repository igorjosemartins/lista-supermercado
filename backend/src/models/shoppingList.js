const mongoose = require("mongoose");

const shoppingListSchema = new mongoose.Schema({
  product: String,
  quantity: Number
});

module.exports = mongoose.model("ShoppingList", shoppingListSchema);
