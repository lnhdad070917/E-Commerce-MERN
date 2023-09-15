import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = async (req, res) => {
  try {
    const response = await prisma.category.create({
      data: req.body,
    });
    res.status(201).json({ data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const response = await prisma.category.findMany();
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const response = await prisma.category.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const response = await prisma.category.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const response = await prisma.category.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json({
      msg: `Data Category dengan id ${req.params.id} berhasil dihapus`,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
