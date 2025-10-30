import express from "express";
import { updateUser, deleteUser } from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.put("/update/:id", auth, updateUser);
router.delete("/delete/:id", auth, deleteUser);

export default router;
