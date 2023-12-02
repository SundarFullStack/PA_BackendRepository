const express = require("express");
const app = express();
const port = 4000;
const connectDB = require("./db");
connectDB();
const signinRouter = require("./Routes/signin"); 
const loginRouter = require("./Routes/login")
const homeRouter = require("./Routes/home")
const cors = require("cors");

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.use(cors({origin:"*"}))

app.use("/signin", signinRouter);

app.use("/login", loginRouter);

app.use("/home", homeRouter);

app.listen(port, () => {
    console.log(`Server started successfully in the port:${port}`)
})