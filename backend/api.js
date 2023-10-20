require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const shoppingListRoutes = require("./src/routes/shoppingListRoutes")

const app = express()

const port = process.env.PORT;

async function connectDataBase() {
  await mongoose.connect(
    process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
}

app.listen(port, () => {
  connectDataBase().catch((err) => {
    console.log(`Erro ao conectar ao MongoDB: ${err}`)
  })

  app.use(bodyParser.json())
  app.use("/shopping-list", shoppingListRoutes)

  console.log(`Servidor está ouvindo na porta: ${port}`)
})
