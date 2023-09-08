import express from "express";
import {
  saveUser,
  saveUsers,
  getUsers,
  updateUser,
  deleteUser,
  createUser,
} from "../middleware/users.js";

const router = express.Router();

router.get("/getAll", getUsers);
router.post("/saveAll", saveUsers);
router.post("/saveUser", saveUser);
router.post("/updateUser", updateUser); // Changed to PUT for updating/

router.post("/deleteUser", deleteUser); // Changed to DELETE for deletion
router.post("/createUser", createUser); // Changed to DELETE for deletion

export default router;
// getUsers, saveUsers, saveUser, updateUser, deleteUser
