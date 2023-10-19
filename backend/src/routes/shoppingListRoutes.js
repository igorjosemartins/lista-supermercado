const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const ShoppingList = require("../models/shoppingList");

// ####################
// ## ROTAS : LISTAS ##
// ####################

router.get("/", async (req, res) => {
  const lists = await ShoppingList.find();
  res.json(lists);
})

router.post("/create", async (req, res) => {
  const { name, items } = req.body;

  const newList = new ShoppingList({ name, items });
  await newList.save();

  res.status(201).json({
    message: "Lista criada com sucesso!",
    list: newList,
  })
})

router.put("/:id", async (req, res) => {

  const listId = req.params.id;
  const { name, items } = req.body;

  const updatedList = await ShoppingList.findByIdAndUpdate(
    listId,
    { name, items },
    { new: true }
  )

  if (!updatedList) {
    res.status(404).json({ message: "Lista não encontrada" });
  }

  res.status(200).json(updatedList);
})

router.delete("/:id/delete", async (req, res) => {

  const listId = req.params.id;
  const deletedList = await ShoppingList.findByIdAndRemove(listId);

  if (!deletedList) {
    return res.status(404).json({ error: "Lista não encontrada" });
  }

  res.status(200).json({ message: "Lista deletada com sucesso!" });
});


// ####################
// ## ROTAS : ITENS ##
// ####################

router.post("/:id/add-item", async (req, res) => {
  const listId = req.params.id;
  const { product, quantity } = req.body;

  await ShoppingList.findByIdAndUpdate(listId, {
    $push: { items: { product, quantity } },
  })

  const updatedList = await ShoppingList.findById(listId);

  res.status(200).json(updatedList);
});

router.put("/:id/:itemId/edit-item", async (req, res) => {

  const listId = req.params.id;
  const itemId = req.params.itemId;
  const { product, quantity } = req.body;

  await ShoppingList.findByIdAndUpdate(listId,
    { items: { product, quantity } },
    { new: true }
  )
})

module.exports = router;
