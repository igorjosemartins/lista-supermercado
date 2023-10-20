const express = require("express");
const router = express.Router();
const ShoppingList = require("../models/shoppingList");

const date = new Date();
const currentDate = date.toLocaleString();

// listagem dos itens
router.get("/", async (req, res) => {

  const items = await ShoppingList.find();

  if (items.length == 0) {

    console.log(`[${currentDate}] - GET (404) : Não há itens criados.`);

    return res.status(404).json( { message: "Não há itens criados." });
  }

  console.log(`[${currentDate}] - GET (200) : ${JSON.stringify(items)}`);
  
  return res.status(200).json({ items });
});


// listar um item em específico
router.get("/search/:item", async (req, res) => {

  const productName = req.params.item;

  const searchedProduct = await ShoppingList.findOne({ product: productName }).exec();

  if (!searchedProduct) {

    console.log(`[${currentDate}] - SEARCH (404) : Item não encontrado`);

    return res.status(404).json({ message: "Item não encontrado" });
  }

  console.log(`[${currentDate}] - SEARCH (200) : ${JSON.stringify(searchedProduct)}`);

  return res.status(200).json(searchedProduct);
})


// criação de item
router.post("/create", async (req, res) => {

  const { product, quantity } = req.body;
  
  if ((quantity <= 0) || (typeof quantity !== "number")) {

    console.log(`[${currentDate}] - POST (400) : A quantidade deve ser um número e não pode ser igual à zero`);

    return res.status(400).json( { message: "A quantidade deve ser um número e não pode ser igual à zero" } );
  }

  const newItem = new ShoppingList({ product, quantity });
  await newItem.save();

  console.log(`[${currentDate}] - POST (200) : ${JSON.stringify(newItem)}`);

  return res.status(201).json({ message: "Item criado com sucesso!", newItem });
});


// edição de item
router.put("/edit/:id", async (req, res) => {

  const itemId = req.params.id;
  const { product, quantity } = req.body;

  if ((quantity <= 0) || (typeof quantity !== "number")) {

    console.log(`[${currentDate}] - PUT (400) : A quantidade deve ser um número e não pode ser igual à zero`);

    return res.status(400).json( { message: "A quantidade deve ser um número e não pode ser igual à zero" } )
  }

  const updatedItem = await ShoppingList.findByIdAndUpdate(
    itemId,
    { product, quantity },
    { new: true }
  );

  if (!updatedItem) {

    console.log(`[${currentDate}] - PUT (404) : Não foi encontrado um Item com este Id`);

    return res.status(404).json( { message: "Não foi encontrado um Item com este Id" });
  }

  console.log(`[${currentDate}] - PUT (200) : ${JSON.stringify(updatedItem)}`);

  return res.status(200).json( { message: "Item editado com sucesso!", updatedItem });
});


// deleção de item
router.delete("/delete/:id", async (req, res) => {

  const itemId = req.params.id;

  const deletedItem = await ShoppingList.findByIdAndDelete(itemId);

  if (!deletedItem) {

    console.log(`[${currentDate}] - DELETE (404) : Não foi encontrado um Item com este Id`);

    return res.status(404).json( { message: "Não foi encontrado um Item com este Id" });
  }

  console.log(`[${currentDate}] - DELETE (200) : ${JSON.stringify(deletedItem)}`);

  return res.status(200).json( { message: "Item deletado com sucesso!", deletedItem });
});

module.exports = router;
