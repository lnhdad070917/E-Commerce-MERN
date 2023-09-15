import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });

export const createProduct = async (req, res) => {
  try {
    upload.single("img")(req, res, async (error) => {
      if (error) {
        res.status(500).json({ msg: "upload image error :" + error.message });
      } else {
        const lastProduct = await prisma.product.findFirst({
          orderBy: [{ code: "desc" }],
        });

        let newCode = "P1";

        if (lastProduct) {
          const lastCode = lastProduct.code;
          const numericPart = parseInt(lastCode.slice(1));
          const newNumericPart = numericPart + 1;
          newCode = `P${newNumericPart}`;
        }

        let imgFileName = "no_image.jpg";

        if (req.file) {
          imgFileName = req.file.filename;
        }

        const product = await prisma.product.create({
          data: {
            code: newCode,
            id_category: Number(req.body.id_category),
            weight: Number(req.body.weight),
            stock: Number(req.body.stock),
            name: req.body.name,
            img: imgFileName,
            id_parent: Number(req.body.id_parent),
            price: req.body.price,
            price_discount: req.body.price_discount,
            type: req.body.type,
            status: req.body.status,
            description: req.body.description,
            variant: req.body.variant,
          },
        });
        res.status(200).json(product);
      }
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await prisma.product.findMany({
      include: {
        category: true,
      },
    });

    const parentMap = new Map();
    product.forEach((product) => {
      if (product.type === "parent") {
        parentMap.set(product.id, product);
        product.children = [];
      } else if (product.type === "child") {
        const parent = parentMap.get(product.id_parent);
        if (parent) {
          parent.children.push(product);
        }
      }
    });

    const parentProduct = Array.from(parentMap.values());
    // const products = parentProduct.map((product) => {
    //   if (product.img) {
    //     product.img = `http://localhost:8000/public/img/${product.img}`;
    //   }
    //   return product;
    // });

    res.status(200).json(parentProduct);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    upload.single("img")(req, res, async (error) => {
      if (error) {
        res.status(500).json({ msg: "upload image error :" + error.message });
      } else {
        const product = {
          id_category: Number(req.body.id_category),
          weight: Number(req.body.weight),
          stock: Number(req.body.stock),
          name: req.body.name,
          id_parent: Number(req.body.id_parent),
          price: req.body.price,
          price_discount: req.body.price_discount,
          type: req.body.type,
          status: req.body.status,
          description: req.body.description,
          variant: req.body.variant,
        };

        if (req.file) {
          product.img = req.file.filename;
        }

        const updateProduct = await prisma.product.update({
          where: { id: Number(req.params.id) },
          data: product,
        });
        res.status(200).json(updateProduct);
      }
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await prisma.product.delete({
      where: { id: Number(req.params.id) },
    });

    res
      .status(200)
      .json({ msg: `Product with id : ${req.params.id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductAll = async (req, res) => {
  try {
    const response = await prisma.product.findMany({
      include: {
        category: true,
      },
    });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        category: true,
      },
    });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const { query } = req.query;

    const product = await prisma.product.findMany({
      where: {
        AND: [
          { type: "parent" },
          {
            OR: [
              { name: { contains: query } },
              { description: { contains: query } },
            ],
          },
        ],
      },
      include: {
        category: true,
      },
    });

    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductByIdParent = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        category: true,
      },
    });

    if (product.type === "parent") {
      const products = await prisma.product.findMany({
        where: { id_parent: Number(req.params.id) },
        include: {
          category: true,
        },
      });
      const response = { ...product, children: products };
      res.status(200).json({ data: response });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
