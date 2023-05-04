require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};
const userRouter = require("./routes/userRouter");




const app = express();
const server = http.createServer(app);


// connectDB();
app.use(
  bodyParser.json({
    parameterLimit: 100000,
    limit: "500mb",
    extended: true,
  })
);
app.use(express.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(cookieParser());

app.use("/public", express.static("public/"));
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    success: false,
    message: err.message,
  });
});

app.get("/", (req, res) => {
  res.send("SUPRLANCE ELASTIC EMAIL API STATUS ✅");
});

// Auth Routes
app.use("/api/user", userRouter);



process.on("uncaughtException", function (err) {
  console.log(err);
});

const port = process.env.PORT || 4040;
server.listen(port, () => {
  console.log("info", `Listening on  test ${port}`);
});


