import { storage } from "../storage";
import { Router } from "express";
import { insertUserSchema } from "@shared/schema";

const router = Router();

// Middleware to check if user is RotemD
const isAdmin = async (req: any, res: any, next: any) => {
  // STRICT Hardcoded Username Check
  const username = req.headers["x-username"];
  
  if (username === "RotemD") {
    next();
  } else {
    console.warn(`Unauthorized admin access attempt by: ${username}`);
    res.status(403).json({ message: "Forbidden: Strict Hardcoded Security Check Failed. Only RotemD is allowed." });
  }
};

router.get("/users", isAdmin, async (req, res) => {
  const users = await storage.getUsers();
  res.json(users);
});

router.patch("/users/:id", isAdmin, async (req, res) => {
  const { isPremium, role, password } = req.body;
  const updatedUser = await storage.updateUser(req.params.id, { isPremium, role, password });
  res.json(updatedUser);
});

export default router;
