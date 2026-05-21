import { useState } from "react";

import { IoClose } from "react-icons/io5";

import {
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { addReviewAPI } from "../services/review.service";

const AddReviewModal = ({
  isOpen,
  onClose,
  companyId,
  fetchReviews,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    reviewText: "",
    rating: 4,
  });

  const [hover, setHover] = useState(0);

  const [loading, setLoading] =
    useState(false);




  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };




  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addReviewAPI(
        companyId,
        formData
      );
      toast.success("Company Added Successfully");

      fetchReviews();

      onClose();

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };




  if (!isOpen) return null;




  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-md rounded-[28px] overflow-hidden">

        {/* TOP DESIGN */}
        <div className="absolute top-0 left-0 pointer-events-none">

          <div className="w-28 h-28 bg-gradient-to-b from-fuchsia-600 to-blue-700 rounded-br-full"></div>

          <div className="absolute top-0 left-16 w-24 h-16 bg-purple-200 rounded-b-full opacity-70"></div>

        </div>



        {/* CLOSE BUTTON */}
        <button
  type="button"
  onClick={() => onClose()}
  className="absolute top-6 right-6 z-50 text-2xl text-black cursor-pointer"
>
  <IoClose />
</button>


        {/* CONTENT */}
        <div className="px-10 py-12 relative z-10">

          {/* TITLE */}
          <h2 className="text-3xl font-bold text-center mb-10">
            Add Review
          </h2>



          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* FULL NAME */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-200 rounded px-4 py-2.5 outline-none focus:border-purple-500"
                required
              />
            </div>



            {/* SUBJECT */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full border border-gray-200 rounded px-4 py-2.5 outline-none focus:border-purple-500"
                required
              />
            </div>



            {/* REVIEW */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">
                Enter your Review
              </label>

              <textarea
                name="reviewText"
                rows="4"
                value={formData.reviewText}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border border-gray-200 rounded px-4 py-3 outline-none resize-none focus:border-purple-500"
                required
              />
            </div>



            {/* RATING */}
            <div className="pt-2">

              <h3 className="text-2xl font-semibold mb-4">
                Rating
              </h3>

              <div className="flex items-center justify-between">

                {/* STARS */}
                <div className="flex items-center gap-2">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          rating: star,
                        })
                      }
                      onMouseEnter={() =>
                        setHover(star)
                      }
                      onMouseLeave={() =>
                        setHover(0)
                      }
                      className="text-3xl"
                    >
                      {star <=
                      (hover ||
                        formData.rating) ? (
                        <FaStar className="text-yellow-400" />
                      ) : (
                        <FaRegStar className="text-gray-300" />
                      )}
                    </button>
                  ))}

                </div>



                {/* LABEL */}
                <span className="text-gray-400 text-sm">
                  Satisfied
                </span>

              </div>
            </div>



            {/* BUTTON */}
            <div className="flex justify-center pt-6">

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-fuchsia-600 to-blue-700 text-white px-10 py-2 rounded font-medium hover:opacity-90 transition"
              >
                {loading
                  ? "Saving..."
                  : "Save"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;