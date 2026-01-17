import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import adminRouter from "./admin";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use("/api/admin", adminRouter);
  
  return httpServer;
}
