const mongoose = require("mongoose");

const shoppingListSchema = new mongoose.Schema({
  name: String,
  items: [
    {
      product: String,
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("ShoppingList", shoppingListSchema);
