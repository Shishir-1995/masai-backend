const express = require("express");
const cors = require("cors"); // Cross Origin Resource Sharing
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./utils/swagger");

dotenv.config();
connectDB();

const app = express();

// CORS - Cross Origin Resource Sharing
// http - unsecured origin
// https - [s -secured] origin

app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend to make requests
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}/api-docs`)
);
