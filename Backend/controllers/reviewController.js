import Review from "../models/Review.js";
import Company from "../models/Company.js";


// CALCULATE COMPANY RATING
const updateCompanyRating = async (companyId) => {
  const reviews = await Review.find({ company: companyId });

  // total reviews
  const totalReviews = reviews.length;

  // average rating
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((acc, item) => acc + item.rating, 0) /
        totalReviews
      : 0;

  // update company
  await Company.findByIdAndUpdate(companyId, {
    averageRating: averageRating.toFixed(1),
    totalReviews,
  });
};




// ADD REVIEW
export const addReview = async (req, res) => {
  try {
    const { companyId } = req.params;

    const {
      fullName,
      subject,
      reviewText,
      rating,
    } = req.body;

    // validation
    if (
      !fullName ||
      !subject ||
      !reviewText ||
      !rating
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check company exists
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // create review
    const review = await Review.create({
      company: companyId,
      fullName,
      subject,
      reviewText,
      rating,
    });

    // update average rating
    await updateCompanyRating(companyId);

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    console.log("Add Review Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




// GET COMPANY REVIEWS
export const getCompanyReviews = async (req, res) => {
  try {
    const { companyId } = req.params;

    const { sortBy } = req.query;

    let sortOption = { createdAt: -1 };

    // sorting
    if (sortBy === "rating") {
      sortOption = { rating: -1 };
    }

    if (sortBy === "oldest") {
      sortOption = { createdAt: 1 };
    }

    const reviews = await Review.find({
      company: companyId,
    }).sort(sortOption);

    return res.status(200).json({
      success: true,
      total: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.log("Get Reviews Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




// LIKE REVIEW
export const likeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.likes += 1;

    await review.save();

    return res.status(200).json({
      success: true,
      message: "Review liked",
      data: review,
    });
  } catch (error) {
    console.log("Like Review Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};