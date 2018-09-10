const express = require("express");
const app = express();
const logger = require("morgan");
const methodOverride = require("method-override");


app.use(logger("dev"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.use(
    methodOverride((req, res) => {
      if (typeof req.body === "object" && req.body._method) {
        const method = req.body._method;
        delete req.body._method;
        return method;  
      }
    })
  );

app.get("/", (request, response) => {
    response.redirect("/cohorts")
})

const cohortsRouter = require('./routes/cohorts');
app.use("/cohorts", cohortsRouter);

const DOMAIN = "localhost";
const PORT = "4646";
app.listen(PORT, DOMAIN, () => {
    console.log(`Server is running on http://${DOMAIN}:${PORT}`)
})