import express from "express";
import "express-async-errors";
import { router } from "./routes/router.js";
import { ExceptionHandler } from "./middlewars/ExceptionHandler.js";

const app = express();
const port = 3333;
app.use(express.json());
app.use(router);
app.use(ExceptionHandler);

app.listen(port, () => console.log(`Running http://localhost:${port}`));
