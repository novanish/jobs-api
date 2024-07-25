require("dotenv").config();
require("express-async-errors");

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

const connectDB = require("./db/connect");

const jobsRouter = require("./routes/jobs");
const authRouter = require("./routes/auth");

const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");
const authMiddleware = require("./middlewares/auth");

const app = express();
const PORT = process.env.PORT || 3000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1/jobs", authMiddleware, jobsRouter);
app.use("/api/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();
