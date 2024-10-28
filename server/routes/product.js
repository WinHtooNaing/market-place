const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();

const productController = require("../controllers/product");
const authMiddleware = require("../middlewares/auth");

router.post(
  "/create-product",
  authMiddleware,
  [
    body("name").trim().notEmpty().withMessage("product name must have."),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("product description must have."),
    body("price").trim().notEmpty().withMessage("product price must have."),
    body("category")
      .trim()
      .notEmpty()
      .withMessage("product category must have."),
    body("used_for")
      .trim()
      .notEmpty()
      .withMessage("product usedFor must have."),
    body("details").isArray().withMessage("product details must array."),
  ],
  productController.addNewProduct
);

router.get("/products", authMiddleware, productController.getAllProducts);

router.get("/products/:id", authMiddleware, productController.getOldProduct);
router.post(
  "/update-product",
  authMiddleware,
  [
    body("name").trim().notEmpty().withMessage("product name must have."),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("product description must have."),
    body("price").trim().notEmpty().withMessage("product price must have."),
    body("category")
      .trim()
      .notEmpty()
      .withMessage("product category must have."),
    body("used_for")
      .trim()
      .notEmpty()
      .withMessage("product usedFor must have."),
    body("details").isArray().withMessage("product details must array."),
  ],
  productController.updateProduct
);

// delete product
// DELETE /products/:id
router.delete("/products/:id", authMiddleware, productController.deleteProduct);

// upload images
router.post("/upload", authMiddleware, productController.uploadProductImage);

router.get(
  "/product-images/:id",
  authMiddleware,
  productController.getSavedImages
);

router.delete(
  "/products/images/destroy/:productId/:imgToDelete",
  authMiddleware,
  productController.deleteProductImages
);
module.exports = router;
