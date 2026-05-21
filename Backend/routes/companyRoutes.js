import express from "express";

import {
  createCompany,
  getCompanies,
  getSingleCompany,
} from "../controllers/companyController.js";
import upload from "../middleware/upload.js";
const router = express.Router();


// CREATE COMPANY
router.post(
  "/",
  upload.single("logo"),
  createCompany
);
// GET ALL COMPANIES
router.get("/", getCompanies);


// GET SINGLE COMPANY
router.get("/:id", getSingleCompany);


export default router;