import "express-async-errors"
import express from "express";
import { ExceptionHandler } from "./middlewars/ExceptionHandler.js";
import { router } from "./routes.js";

const app = express();
const port = 3333;

app.use(express.json());
app.use(router);
app.use(ExceptionHandler)

app.listen(port, () => console.log(`Running http://localhost:${port}`));
