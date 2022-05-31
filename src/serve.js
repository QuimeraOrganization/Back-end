const express = require('express');

// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

const app = express();
const port = 3333;

app.use(express.json());

// app.post('/product', async (req, res) => {
//    const { name, description, image } = req.body;

//    const result = await prisma.product.create({
//       data: {
//          name,
//          description,
//          image
//       },
//    })

//    res.json(result);
// })

// app.put('/product/:id', async (req, res) => {
//    const { id } = req.params
//    const post = await prisma.product.update({
//       where: { id: parseInt(id) },
//       data: { name: "teste update" },
//    })
//    res.json(post)
// })

app.listen(port, () => console.log(`Running http://localhost:${port}`));