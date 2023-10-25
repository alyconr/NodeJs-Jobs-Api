require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

//security packages

const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");

const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const connectDB = require("./db/connect");
const autheticateUser = require("./middleware/authentication");

const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(cors());
app.use(xss());
app.use(helmet());
app.set("trust proxy", true); // trust proxy is needed to veryify  if the request is coming from a real  server
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.get("/", (req, res) => {
  res.send(
    '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 10px auto; background-color: #f2f2f2; "><h1 style="text-align: center; margin-bottom: 20px; font-size: 50px; font-weight: bold; color: #3a3a3a; line-height: 1.2; text-decoration: none;  ">Jobs API</h1><a style="text-align: center; margin-bottom: 20px; font-size: 20px; font-weight: bold; color: #3a3a3a; line-height: 1.2; " href="/api-docs">API Documentation</a></div>'
  );
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", autheticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.get("/", (req, res) => {
  res.send("Jobs API");
});

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(`Server is listening on port ${port} and connected to db`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
