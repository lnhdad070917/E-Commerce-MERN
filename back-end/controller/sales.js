import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateSales = async (req, res) => {
  //   console.log(req.body);
  try {
    const response = await prisma.sales.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
