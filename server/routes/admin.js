const { Router } = require("express");
const router = Router();

const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/isAdmin");
const adminController = require("../controllers/admin");

router.get(
  "/products",
  authMiddleware,
  adminMiddleware,
  adminController.getAllProducts
);
// approve product
// POST /admin/product-approve/:id
router.post(
  "/product-approve/:id",
  authMiddleware,
  adminMiddleware,
  adminController.approveProduct
);

// reject product
// POST /admin/product-reject/:id
router.post(
  "/product-reject/:id",
  authMiddleware,
  adminMiddleware,
  adminController.rejectProduct
);

// rollback product
// POST /admin/product-rollback/:id
router.post(
  "/product-rollback/:id",
  authMiddleware,
  adminMiddleware,
  adminController.rollbackProduct
);

// get users
// GET /admin/users
router.get("/users", authMiddleware, adminMiddleware, adminController.getUsers);
// ban user
// POST /admin/user-ban/:id
router.post(
  "/user-ban/:id",
  authMiddleware,
  adminMiddleware,
  adminController.banUser
);

// unban user
// POST /admin/user-unban/:id
router.post(
  "/user-unban/:id",
  authMiddleware,
  adminMiddleware,
  adminController.unbanUser
);
module.exports = router;
