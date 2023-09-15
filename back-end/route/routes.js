import express from "express";
import {
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controller/customer.js";

import {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
} from "../controller/category.js";

import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductAll,
  getProductById,
  getProductByIdParent,
  searchProduct,
} from "../controller/product.js";

import { createSalesItem } from "../controller/salesitem.js";

import { loginAdmin } from "../controller/auth/Admin.js";
import { updateSales } from "../controller/sales.js";

const router = express.Router();

//Customer
router.post("/customer", createCustomer);
router.get("/customer", getCustomer);
router.put("/customer/:id", updateCustomer);
router.delete("/customer/:id", deleteCustomer);

//Category
router.post("/category", createCategory);
router.get("/category", getCategory);
router.put("/category/:id", updateCategory);
router.get("/category/:id", getCategoryById);
router.delete("/category/:id", deleteCategory);

//
router.post("/product", createProduct);
router.get("/product", getProduct);
router.get("/productsAll", getProductAll);
router.put("/product/:id", updateProduct);
router.get("/product/:id", getProductById);
router.delete("/product/:id", deleteProduct);
router.get("/product-parent/cari", searchProduct);
router.get("/product-parent/:id", getProductByIdParent);

//Sales Items
router.post("/salesItems", createSalesItem);

//Sales
router.put("/sales/:id", updateSales);

//ADMIN
router.post("/login-admin", loginAdmin);

export default router;
