import config from "./config/config.js";
import app from "./server/express.js";
import express from 'express';
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri, {
    // useNewUrlParser: true, 
    // useCreateIndex: true,
    // useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, 'client', 'dist');
  app.use(express.static(staticPath));

  app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});
} else {
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to User application." });
  });
}

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});