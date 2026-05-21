import {
  FaStar,
  FaSearch,
} from "react-icons/fa";

const Navbar = ({
  search,
  setSearch,
  companies,
}) => {
  const filteredCompanies =
  !search || search.trim() === ""
    ? []
    : companies.filter((company) =>
        company.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
  return (
    <nav className="w-full bg-white border-b shadow-sm">

      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2">

          <div className="w-9 h-9 rounded-full bg-purple-700 flex items-center justify-center">

            <FaStar className="text-white text-sm" />

          </div>



          <h1 className="text-[22px] font-semibold">

            <span className="text-gray-700">
              Review
            </span>

            <span className="text-blue-700">
              &
            </span>

            <span className="font-bold text-black">
              RATE
            </span>

          </h1>
        </div>



        {/* SEARCH */}
        {/* <div className="hidden md:flex items-center border border-gray-200 rounded overflow-hidden w-[300px] bg-white"> */}
          {/* SEARCH */}
<div className="relative hidden md:block w-[300px]">

  {/* INPUT BOX */}
  <div className="flex items-center border border-gray-200 rounded overflow-hidden bg-white">

    <input
      type="text"
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      placeholder="Search..."
      className="w-full px-4 py-2 text-sm outline-none"
    />



    <button className="px-4 text-purple-700">
      <FaSearch />
    </button>

  </div>



  {/* SUGGESTIONS */}
  {filteredCompanies.length > 0 && (
    <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-2 z-50 max-h-60 overflow-y-auto">

      {filteredCompanies.map(
        (company) => (
          <div
            key={company._id}
            onClick={() =>
              setSearch(company.name)
            }
            className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm"
          >
            {company.name}
          </div>
        )
      )}

    </div>
  )}

</div>



        {/* RIGHT */}
        <div className="flex items-center gap-8 text-sm">

          <button className="hover:text-purple-700 transition">
            SignUp
          </button>

          <button className="hover:text-purple-700 transition">
            Login
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;