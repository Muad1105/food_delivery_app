import express from "express";
import mongoose from "mongoose";
import session from "express-session";

import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import { productRoutes } from "./routes/productRoutes.js";
import { categoryRoutes } from "./routes/categoryRoutes.js";
import { ingredentRoutes } from "./routes/ingredientRoutes.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

//Setting multiple origins
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"], // Whitelist of allowed origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (cookies, HTTP authentication) cross-origin
};

//middleware for processing CORS POLICY
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
app.use("/ingredients", ingredentRoutes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`listening to port ${process.env.PORT}`);
    console.log("Connected to mongoDB");
  });
});
