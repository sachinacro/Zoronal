import { FaStar, FaThumbsUp } from "react-icons/fa";

const ReviewCard = ({
  review,
  handleLike,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-5">

      {/* TOP */}
      <div className="flex items-start justify-between">

        <div>
          <h3 className="text-xl font-semibold">
            {review.fullName}
          </h3>

          <p className="text-gray-500 mt-1">
            {review.subject}
          </p>
        </div>

        <div className="flex items-center gap-1 text-yellow-400">
          {[1, 2, 3, 4, 5].map((item) => (
            <FaStar key={item} />
          ))}

          <span className="ml-2 text-black font-medium">
            {review.rating}
          </span>
        </div>
      </div>



      {/* REVIEW TEXT */}
      <p className="text-gray-600 mt-5 leading-7">
        {review.reviewText}
      </p>



      {/* ACTIONS */}
      <div className="mt-6 flex items-center gap-6">

        <button
          onClick={() => handleLike(review._id)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
        >
          <FaThumbsUp />

          <span>{review.likes}</span>
        </button>

      </div>
    </div>
  );
};

export default ReviewCard;