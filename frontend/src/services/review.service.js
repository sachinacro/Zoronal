import API from "../api/axios";



// GET REVIEWS
export const getReviewsAPI = async (
  companyId,
  sortBy = ""
) => {
  const response = await API.get(
    `/reviews/${companyId}?sortBy=${sortBy}`
  );

  return response.data;
};



// ADD REVIEW
export const addReviewAPI = async (
  companyId,
  data
) => {
  const response = await API.post(
    `/reviews/${companyId}`,
    data
  );

  return response.data;
};



// LIKE REVIEW
export const likeReviewAPI = async (
  reviewId
) => {
  const response = await API.patch(
    `/reviews/like/${reviewId}`
  );

  return response.data;
};