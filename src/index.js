import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import db from "./config/database.js";
import cors from "cors";
import fileUpload from "express-fileupload";

import ROuteAuth from "./routers/RouteAuth.js"
import RouteUnit from "./routers/RouteUnit.js";
import RouteFrame from "./routers/RouteFrame.js";
import RouteMachine from "./routers/RouteMachine.js";
import RouteDimensions from "./routers/RouteDimensions.js";
import RouteCapacity from "./routers/RouteCapacity.js";
import RouteElectricity from "./routers/RouteElectricity.js";
import RouteCredit from "./routers/RouteCredit.js";

import createModel from "./models/ModelFrame.js";

dotenv.config();
const app = express();

async function initializeDatabase() {
  try {
    await db.authenticate();
    console.log("Database connected");
    // await db.sync()
    // await createModel.sync({ alter: true });
  } catch (error) {
    console.error("Database error:", error);
  }
}

initializeDatabase();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: "Melebihi batas request ke server.",
});

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use("/public", express.static("public"));
app.use(fileUpload());
app.use(express.json());

app.use("/auth",ROuteAuth)
app.use("/unit", RouteUnit);
app.use("/frame", RouteFrame);
app.use("/machine", RouteMachine);
app.use("/dimensions", RouteDimensions);
app.use("/capacity", RouteCapacity);
app.use("/electricity", RouteElectricity);
app.use("/credit", RouteCredit);

app.listen(3000, () => {
  console.log("server jalan di server 3000");
});