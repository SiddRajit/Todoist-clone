import express from "express";
import "dotenv/config";
import todoRouter from "./routes/todoRoutes";

const app = express();

app.use("/api/todos", todoRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
