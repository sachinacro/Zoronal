import {
  useEffect,
  useState,
} from "react";

import {
  FaMapMarkerAlt,
} from "react-icons/fa";

import Navbar from "../components/Navbar";

import CompanyCard from "../components/CompanyCard";

import AddCompanyModal from "../components/AddCompanyModal";

import {
  getCompaniesAPI,
} from "../services/company.service";

const Home = () => {
  const [companies, setCompanies] =
    useState([]);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [selectedCity, setSelectedCity] =
    useState("");

  const [sortBy, setSortBy] =
    useState("");




  // FETCH COMPANIES
  const fetchCompanies = async () => {
    try {
      const response =
        await getCompaniesAPI({
          search,
          city: selectedCity,
          sort: sortBy,
        });

      setCompanies(response.data);

    } catch (error) {
      console.log(error);
    }
  };




  // FETCH ON CHANGE
  useEffect(() => {
    const delayDebounce =
      setTimeout(() => {
        fetchCompanies();
      }, 500);

    return () =>
      clearTimeout(delayDebounce);

  }, [
    search,
    selectedCity,
    sortBy,
  ]);




  return (
    <div className="min-h-screen bg-[#f7f7f7]">

      {/* NAVBAR */}
      <Navbar
        search={search}
        setSearch={setSearch}
        companies={companies}
      />



      {/* PAGE */}
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* FILTER ROW */}
        <div className="flex items-end justify-between">

          {/* LEFT */}
          <div className="flex items-end gap-4">

            {/* CITY */}
            <div>

              <label className="text-[13px] text-gray-600 block mb-2">
                Select City
              </label>



              <div className="flex items-center gap-3">

                {/* CITY DROPDOWN */}
                <div className="relative">

                  <select
                    value={selectedCity}
                    onChange={(e) =>
                      setSelectedCity(
                        e.target.value
                      )
                    }
                    className="w-[240px] border border-gray-200 bg-white rounded px-4 py-2.5 pr-10 text-sm outline-none appearance-none"
                  >

                    <option value="">
                      All Cities
                    </option>

                    {[
                      ...new Set(
                        companies.map(
                          (company) =>
                            company.city
                        )
                      ),
                    ].map((city) => (
                      <option
                        key={city}
                        value={city}
                      >
                        {city}
                      </option>
                    ))}

                  </select>



                  {/* LOCATION ICON */}
                  <FaMapMarkerAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600 text-sm pointer-events-none" />

                </div>



                {/* FIND BUTTON */}
                <button className="bg-gradient-to-r from-fuchsia-600 to-blue-700 text-white text-sm px-5 py-2.5 rounded">
                  Find Company
                </button>



                {/* ADD BUTTON */}
                <button
                  onClick={() =>
                    setIsModalOpen(true)
                  }
                  className="bg-gradient-to-r from-fuchsia-600 to-blue-700 text-white text-sm px-5 py-2.5 rounded"
                >
                  + Add Company
                </button>

              </div>
            </div>
          </div>



          {/* SORT */}
          <div>

            <label className="text-[13px] text-gray-600 block mb-2">
              Sort:
            </label>



            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value
                )
              }
              className="w-[110px] border border-gray-200 bg-white rounded px-4 py-2.5 text-sm outline-none"
            >

              <option value="name">
                Name
              </option>

              <option value="rating">
                Average
              </option>

              <option value="location">
                Location
              </option>

            </select>

          </div>
        </div>



        {/* DIVIDER */}
        <div className="border-b mt-5"></div>



        {/* RESULT */}
        <p className="text-xs text-gray-400 mt-10 mb-5">
          Result Found:{" "}
          {companies.length}
        </p>



        {/* COMPANY LIST */}
        <div className="space-y-5">

          {companies.map((company) => (
            <CompanyCard
              key={company._id}
              company={company}
            />
          ))}

        </div>
      </div>



      {/* MODAL */}
      <AddCompanyModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        fetchCompanies={fetchCompanies}
      />

    </div>
  );
};

export default Home;