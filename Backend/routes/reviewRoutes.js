import express from "express";

import {
  addReview,
  getCompanyReviews,
  likeReview,
} from "../controllers/reviewController.js";

const router = express.Router();


// ADD REVIEW
router.post("/:companyId", addReview);


// GET COMPANY REVIEWS
router.get("/:companyId", getCompanyReviews);


// LIKE REVIEW
router.patch("/like/:reviewId", likeReview);


export default router;