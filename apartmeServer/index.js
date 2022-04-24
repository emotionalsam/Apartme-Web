const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./public")));
app.use("/api", require("./api"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is starting at port ${PORT}`));
