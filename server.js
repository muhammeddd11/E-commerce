const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const port = process.env.PORT_NUMBER || 3000;
const DB = process.env.DB_STRING.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => {
  console.log("connection to data base has been established");
});
const server = app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
