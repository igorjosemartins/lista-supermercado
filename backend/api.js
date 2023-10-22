require("dotenv").config();
const cls = require("./src/extra/cls");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const shoppingListRoutes = require("./src/routes/shoppingListRoutes");
const app = express();

const port = process.env.PORT || 8080;

async function connectDataBase() {
  await mongoose.connect(
    process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
};

app.listen(port, () => {
  connectDataBase().catch((err) => {
    console.log(`Erro ao conectar ao MongoDB: ${err}`)
  })

  app.use(express.json());
  app.use(cors({ origin: "*" }));
  app.use("/shopping-list", shoppingListRoutes);

  cls;
  console.log(`Servidor está ouvindo na porta: ${port}`)
});
