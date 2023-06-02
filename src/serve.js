import express from "express";
import "express-async-errors";
import { router } from "./routes/router.js";
import { ExceptionHandler } from "./middlewars/ExceptionHandler.js";
import paginate from 'express-paginate';
import pagination from "./middlewars/pagination.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3333;

const corsOptions = {
    origin: 'https://tccquimera.vercel.app',
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Adicione seus cabeçalhos personalizados aqui
  };
  

app.use(cors(corsOptions));
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(paginate.middleware(10, 50));
app.use(pagination); // Midleware para setar o limite minimo de itens na paginação
app.use(router);
app.use(ExceptionHandler);

app.listen(port, () => console.log(`Running http://localhost:${port}`));
