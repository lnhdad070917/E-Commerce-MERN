import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSalesItem = async (req, res) => {
  const salesItemsData = req.body;
  // console.log(salesItemsData);
  try {
    const response = await prisma.$transaction(async (prisma) => {
      const lastSales = await prisma.sales.findFirst({
        orderBy: [{ id: "desc" }],
      });

      let newCode = "Inv1";

      if (lastSales) {
        const lastCode = lastSales.no_invoice;
        const numericPart = parseInt(lastCode.slice(3));
        const newNumericPart = numericPart + 1;
        newCode = `Inv${newNumericPart}`;
      }

      const newCustomer = await prisma.customer.create({
        data: {
          name: "",
          email: "",
          address: "",
          no_wa: "",
          city: "",
          province: "",
          postal_code: "",
          username: "",
          password: "",
        },
      });

      const newSales = await prisma.sales.create({
        data: {
          no_invoice: newCode,
          code_status: 1,
          id_customer: newCustomer.id,
          delivery_name: "",
          delivery_cost: 0,
          total_pay: 0,
          price: 0,
        },
      });

      const createdSalesItems = [];

      console.log(salesItemsData);
      for (const salesItemData of salesItemsData) {
        const product = await prisma.product.findUnique({
          where: {
            id: salesItemData.id_product,
          },
        });

        if (product.stock < salesItemData.qty) {
          return res.status(400).json({ data: "not enough stok" });
        }

        const createdSalesItem = await prisma.sales_Item.create({
          data: {
            ...salesItemData,
            id_sales: newSales.id,
            id_customer: newCustomer.id,
          },
        });

        await prisma.product.update({
          where: { id: product.id },
          data: {
            stock: product.stock - salesItemData.qty,
          },
        });

        createdSalesItems.push(createdSalesItem);
      }

      const totalItemPrice = createdSalesItems.reduce(
        (total, item) => total + item.price * item.qty,
        0
      );

      const updatedSales = await prisma.sales.update({
        where: { id: newSales.id },
        data: {
          price: totalItemPrice,
          total_pay: totalItemPrice + 0,
        },
      });

      return {
        salesItems: createdSalesItems,
        newSales: updatedSales,
        newCustomer: newCustomer,
      };
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
