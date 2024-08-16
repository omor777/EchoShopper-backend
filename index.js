import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import routes from "./src/routes/index.js";

const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());
app.use(routes);

app.get("/", async (_req, res) => {
  res.status(200).json({ message: "Ok" });
});

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connect to DB successful!");
  })
  .catch((e) => {
    console.log(e);
  });

app.use((err, _req, res, _next) => {
  console.log(err.stack);
  res.status(500)({ error: "Something went wrong!" });
});
