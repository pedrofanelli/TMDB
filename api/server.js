const express = require('express');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const db = require('./config/db');
const models = require('./models'); 
const routes = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes); 
app.use("/", (req, res, next) => {
    console.log("REDIRECCION");
    res.redirect("/api");
});

db.sync({force: false}).then(() => {
    app.listen(3001, () => {
        console.log("BACK! API on port 3001");
    });
});
