import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import AddReviewModal from "../components/AddReviewModal";

import {
  getReviewsAPI,
  likeReviewAPI,
} from "../services/review.service";

import API from "../api/axios";

import {
  FaStar,
  FaThumbsUp,
  FaMapMarkerAlt,
} from "react-icons/fa";

const CompanyDetails = () => {
  const { id } = useParams();

  const [company, setCompany] =
    useState(null);

  const [reviews, setReviews] =
    useState([]);

  const [sortBy, setSortBy] =
    useState("");

  const [isModalOpen, setIsModalOpen] =
    useState(false);




  // FETCH COMPANY
  const fetchCompany = async () => {
    try {
      const response = await API.get(
        `/companies/${id}`
      );

      setCompany(response.data.data);

    } catch (error) {
      console.log(error);
    }
  };




  // FETCH REVIEWS
  const fetchReviews = async () => {
    try {
      const response =
        await getReviewsAPI(
          id,
          sortBy
        );

      setReviews(response.data);

    } catch (error) {
      console.log(error);
    }
  };




  // LIKE REVIEW
  const handleLike = async (
    reviewId
  ) => {
    try {
      await likeReviewAPI(reviewId);

      fetchReviews();

    } catch (error) {
      console.log(error);
    }
  };




  useEffect(() => {
    fetchCompany();
    fetchReviews();
  }, [sortBy]);




  if (!company) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }




  return (
    <div className="min-h-screen bg-[#f8f8f8]">

      <Navbar />



      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* TOP CONTAINER */}
        <div className="bg-white rounded-md shadow-sm border p-6">

          <div className="flex items-start justify-between">

            {/* LEFT */}
            <div className="flex gap-5">

              {/* LOGO */}
             <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100">

  <img
    src={
      company.logo ||
      "https://via.placeholder.com/100"
    }
    alt={company.name}
    className="w-full h-full object-cover"
  />

</div>



              {/* INFO */}
              <div>

                <h1 className="text-2xl font-semibold text-gray-800">
                  {company.name}
                </h1>



              <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">

  <FaMapMarkerAlt className="text-[10px]" />

  <p>{company.location}{" "}{company.city}</p>

</div>



                {/* RATING */}
                <div className="flex items-center gap-2 mt-4">

                  <span className="font-bold text-lg">
                    {company.averageRating || 4.5}
                  </span>

                  <div className="flex text-yellow-400 text-sm">
                    {[1, 2, 3, 4, 5].map(
                      (item) => (
                        <FaStar
                          key={item}
                        />
                      )
                    )}
                  </div>

                 <span className="text-sm font-semibold text-gray-700">
  {company.totalReviews} Reviews
</span>

                </div>
              </div>
            </div>



            {/* RIGHT */}
            <div className="flex flex-col items-end">

              <p className="text-[11px] text-gray-400 mb-6">
                Founded on 01-01-2016
              </p>



              <button
                onClick={() =>
                  setIsModalOpen(true)
                }
                className="bg-gradient-to-r from-fuchsia-600 to-blue-700 text-white text-sm px-5 py-2 rounded"
              >
                + Add Review
              </button>

            </div>
          </div>



          {/* DIVIDER */}
          <div className="border-b mt-6"></div>



          {/* RESULT */}
          <p className="text-xs text-gray-400 mt-4">
            Result Found:{" "}
            {reviews.length}
          </p>



          {/* REVIEWS */}
          <div className="mt-5 space-y-8">

            {reviews.map(
              (review, index) => (
                <div
                  key={review._id}
                  className="flex gap-4"
                >

                  {/* STATIC IMAGE */}
                  <img
                    src={
                      index % 2 === 0
                        ? "https://randomuser.me/api/portraits/men/32.jpg"
                        : "https://randomuser.me/api/portraits/women/44.jpg"
                    }
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />



                  {/* CONTENT */}
                  <div className="flex-1">

                    {/* TOP */}
                    <div className="flex items-start justify-between">

                      <div>

                        <h3 className="font-semibold text-sm">
                          {
                            review.fullName
                          }
                        </h3>

                        <p className="text-[11px] text-gray-400 mt-1">
                          01-01-2022,
                          14:33
                        </p>
                      </div>



                      {/* STARS */}
                      <div className="flex text-yellow-400 text-sm">
                        {[
                          1,
                          2,
                          3,
                          4,
                          5,
                        ].map((item) => (
                          <FaStar
                            key={item}
                          />
                        ))}
                      </div>
                    </div>



                    {/* SUBJECT */}
                    <p className="text-sm text-gray-600 mt-3">
                      {review.subject}
                    </p>



                    {/* REVIEW TEXT */}
                    <p className="text-xs text-gray-500 leading-6 mt-2">
                      {
                        review.reviewText
                      }
                    </p>



                    {/* LIKE */}
                    <button
                      onClick={() =>
                        handleLike(
                          review._id
                        )
                      }
                      className="flex items-center gap-2 mt-4 text-gray-500 text-sm"
                    >
                      <FaThumbsUp />

                      {review.likes}
                    </button>

                  </div>
                </div>
              )
            )}

          </div>
        </div>



        {/* SORT */}
        <div className="flex justify-end mt-6">

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
            className="border bg-white rounded px-4 py-2 text-sm"
          >
            <option value="">
              Latest
            </option>

            <option value="rating">
              Rating
            </option>

            <option value="oldest">
              Oldest
            </option>
          </select>

        </div>
      </div>



      {/* MODAL */}
      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        companyId={id}
        fetchReviews={fetchReviews}
      />

    </div>
  );
};

export default CompanyDetails;