import {
  FaStar,
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  useNavigate,
} from "react-router-dom";

const CompanyCard = ({
  company,
}) => {
  const navigate = useNavigate();




  return (
    <div className="bg-white border border-gray-100 rounded-md shadow-sm px-6 py-5 flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-5">

        {/* LOGO */}
        <div className="w-20 h-20 rounded bg-gray-100 overflow-hidden">

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

          {/* NAME */}
          <h2 className="text-[20px] font-semibold text-gray-800">
            {company.name}
          </h2>



          {/* LOCATION */}
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">

            <FaMapMarkerAlt className="text-[10px]" />

            <p>
              {company.location}{" "} {company.city}
            </p>

          </div>



          {/* RATING */}
          <div className="flex items-center gap-3 mt-4">

            {/* NUMBER */}
            <span className="font-bold text-lg">
              {company.averageRating ||
                4.5}
            </span>



            {/* STARS */}
            <div className="flex text-yellow-400 text-sm">

              {[1, 2, 3, 4, 5].map(
                (item) => (
                  <FaStar
                    key={item}
                  />
                )
              )}

            </div>



            {/* REVIEWS */}
            <span className="text-sm font-semibold text-gray-700">
              {
                company.totalReviews
              }{" "}
              Reviews
            </span>

          </div>
        </div>
      </div>



      {/* RIGHT */}
      <div className="flex flex-col items-end">

        {/* DATE */}
        <p className="text-[11px] text-gray-400 mb-8">
          Founded on{" "}
          {new Date(
            company.foundedOn
          ).toLocaleDateString()}
        </p>



        {/* BUTTON */}
        <button
          onClick={() =>
            navigate(
              `/company/${company._id}`
            )
          }
          className="bg-[#1f1f1f] hover:bg-black text-white text-sm px-6 py-2.5 rounded"
        >
          Detail Review
        </button>

      </div>
    </div>
  );
};

export default CompanyCard;