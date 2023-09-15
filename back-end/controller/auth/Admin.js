import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error("Anda harus mengisi username dan password");
    }

    const existingAdmin = await findAdminByUsername(username);

    if (!existingAdmin) {
      throw new Error("Username tidak ditemukan");
    }

    if (password !== existingAdmin.password) {
      throw new Error("Password yang anda masukan salah");
    }

    const accessToken = createToken(existingAdmin);

    res.status(200).json({ accessToken, msg: "login admin success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findAdminByUsername = async (username) => {
  return prisma.admin.findFirst({
    where: { username: username },
  });
};

const createToken = (admin) => {
  return jwt.sign({ userId: admin.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "8m",
  });
};
