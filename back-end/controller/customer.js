import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCustomer = async (req, res) => {
  try {
    const response = await prisma.customer.create({
      data: req.body,
    });
    res.status(201).json({ data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const response = await prisma.customer.findMany();
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const response = await prisma.customer.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const response = await prisma.customer.delete({
      where: { id: Number(req.params.id) },
    });
    res
      .status(200)
      .json({
        msg: `Data Customer dengan id ${req.params.id} berhasil dihapus`,
      });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
