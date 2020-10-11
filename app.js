require("dotenv").config();
const express = require("express");
const app = express();
const port = Number(process.env.PORT);
const cors = require("cors");
const errorHandling = require("./middlewares/errorhandling")

const router = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


app.use(router);
// app.use(errorHandling);


app.listen(port, () => {
	console.log("Listening on port " + port);
});
