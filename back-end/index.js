import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";

import Router from "./route/routes.js";

const prisma = new PrismaClient();

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(Router);

app.use("/public/img", express.static("public/img"));

app.use("/connect", async (req, res) => {
  try {
    await prisma.$connect();
    res.json({ msg: "connect success" });
  } catch (error) {
    console.log({ error: error.message });
    res.json({ msg: "connect error" });
  }
});

app.listen(process.env.APP_PORT, () => {
  console.log("server running and up");
});
