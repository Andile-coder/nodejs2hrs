const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
//routes
const contactRoutes = require("./routes/contactRoute");
//middleware
const errorHandler = require("./middleware/errorHandler");

app.use("/api/contacts", contactRoutes);
app.use(errorHandler);
app.listen(port, () => {
  console.log("Listening to Port " + port);
});
