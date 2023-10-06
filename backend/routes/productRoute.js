const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  deleteReview,
  getProductReviews,
  getAdminProducts,

} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.get( "/products",getAllProduct );
router.get("/admin/products", isAuthenticatedUser, authorizeRoles("admin"),getAdminProducts);
router.post("/admin/product/new", isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.put("/admin/product/:id", isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router.delete("/admin/product/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.get("/product/:id", getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

module.exports = router;
