const { Router } = require("express");
const { body } = require("express-validator");

const bidController = require("../controllers/bid");
const authMiddleware = require("../middlewares/auth");

const router = Router();

router.post(
  "/add-bid",
  [
    body("message").trim().notEmpty().withMessage("Message name must have."),
    body("phone").trim().notEmpty().withMessage("Phone number must have."),
  ],
  authMiddleware,
  bidController.savedNewBid
);

router.get("/bids/:product_id", bidController.getAllBids);

module.exports = router;
