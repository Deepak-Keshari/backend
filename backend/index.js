require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors("*"));
app.use(express.json({ limit: "250mb" }));
app.use(express.urlencoded({ extended: true, limit: "250mb" }));

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/country", require("./routes/countryRoutes"));


app.get("/api/user", async () => {
  console.log("Yes");
});
mongoose
  .connect("mongodb://localhost:27017/myDB", {
    // useNewUrlParser: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(5000, () => {
      console.log("App is running on 5000");
    });
  })
  .catch((err) => {
    console.log("Error is ", err);
  });
