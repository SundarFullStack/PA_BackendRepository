const express = require("express");
const app = express();
const port = 4000;
const connectDB = require("./db");
connectDB();
const cors = require("cors");
const bodyParser = require("body-parser")
const signinRouter = require("./Routes/signin");
const loginRouter = require("./Routes/login");
const homeRouter = require("./Routes/home");
const prodRouter = require("./Routes/ProfileProd");
const profile = require("./Routes/profileRoute");
const QualityRouter = require("./Routes/QualityRouter");
const StoreRouter = require("./Routes/StoreRouter");
const StoreIssue = require("./Routes/StoreIssue");
const ForgotPassword = require("./Routes/ForgotPassword");


app.get("/", (req, res) => {
  res.send("Welcome to nodejs API project :)")
})
app.use(express.json());

app.use(bodyParser.json(),cors({ origin: "*" }));

app.use("/signin", signinRouter);

app.use("/login", loginRouter);

app.use("/home", homeRouter);

app.use("/prodData", prodRouter);

app.use("/profile", profile);

app.use("/profQuality", QualityRouter);

app.use("/profStore", StoreRouter);

app.use("/profIssue", StoreIssue);

app.use("/ForgotPassword", ForgotPassword);

app.listen(port, () => {
  console.log(`Server started successfully in the port:${port}`);
});
