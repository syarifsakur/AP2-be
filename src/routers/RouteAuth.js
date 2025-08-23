import express from "express";
import {
  Login,
  logout,
  refreshTokenAuth,
  register,
} from "../controllers/Auth.js";
import verifyToken from "../middlewares/VerifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", Login);
router.get("/refresh-token", refreshTokenAuth);
router.delete("/logout", verifyToken, logout);

export default router;
