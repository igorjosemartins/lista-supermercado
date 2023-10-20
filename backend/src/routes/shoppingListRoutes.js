const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const ShoppingList = require("../models/shoppingList");

// listagem dos itens
router.get("/", async (req, res) => {

  const items = await ShoppingList.find();

  if (items.length == 0) {
    return res.status(404).json( { message: "Não há itens criados." });
  }

  res.status(200).json({ items });
});


// listar um item em específico
router.get("/search/:item", async (req, res) => {

  const productName = req.params.item;

  const searchedProduct = await ShoppingList.findOne({ product: productName }).exec();

  if (!searchedProduct) {
    return res.status(404).json({ message: "Item não encontrado" });
  }

  res.status(200).json(searchedProduct);
})


// criação de item
router.post("/create", async (req, res) => {

  const { product, quantity } = req.body;
  
  if ((quantity <= 0) || (typeof quantity !== "number")) {
    return res.status(400).json( { message: "A quantidade deve ser um número e não pode ser igual à zero" } );
  }

  const newItem = new ShoppingList({ product, quantity });
  await newItem.save();

  res.status(201).json({ message: "Item criado com sucesso!", newItem });
});


// edição de item
router.put("/edit/:id", async (req, res) => {

  const itemId = req.params.id;
  const { product, quantity } = req.body;

  if ((quantity <= 0) || (typeof quantity !== "number")) {
    return res.status(400).json( { message: "A quantidade deve ser um número e não pode ser igual à zero" } )
  }

  const updatedItem = await ShoppingList.findByIdAndUpdate(
    itemId,
    { product, quantity },
    { new: true }
  );

  if (!updatedItem) {
    return res.status(404).json( { message: "Não foi encontrado um Item com este Id" });
  }

  res.status(200).json( { message: "Item editado com sucesso!", updatedItem });
});


// deleção de item
router.delete("/delete/:id", async (req, res) => {

  const itemId = req.params.id;

  const deletedItem = await ShoppingList.findByIdAndDelete(itemId);

  if (!deletedItem) {
    return res.status(404).json( { message: "Não foi encontrado um Item com este Id" });
  }

  res.status(200).json( { message: "Item deletado com sucesso!", deletedItem });
});

module.exports = router;
