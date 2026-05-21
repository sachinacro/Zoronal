import { useState } from "react";

import { IoClose } from "react-icons/io5";

import { createCompanyAPI } from "../services/company.service";
import { toast } from "react-toastify";
const AddCompanyModal = ({
  isOpen,
  onClose,
  fetchCompanies,
}) => {

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    city: "",
    foundedOn: "",
    logo: "",
    description: "",
  });

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

    //   await createCompanyAPI(formData);
const submitData =
  new FormData();

submitData.append(
  "name",
  formData.name
);

submitData.append(
  "location",
  formData.location
);

submitData.append(
  "city",
  formData.city
);

submitData.append(
  "foundedOn",
  formData.foundedOn
);

submitData.append(
  "description",
  formData.description
);

submitData.append(
  "logo",
  formData.logo
);

await createCompanyAPI(
  submitData
);
toast.success("Company Added Successfully");
      fetchCompanies();

      onClose();

      // RESET
      setFormData({
        name: "",
        location: "",
        city: "",
        foundedOn: "",
        logo: null,
        description: "",
      });

    } catch (error) {
      console.log(error);
    //   alert("Failed to create company");
toast.error("Failed to create company");    
} finally {
      setLoading(false);
    }
  };




  if (!isOpen) return null;





  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
    >

      {/* MODAL */}
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="relative bg-white w-full max-w-lg rounded-[28px] overflow-hidden"
      >

        {/* TOP DESIGN */}
        <div className="absolute top-0 left-0 pointer-events-none">

          <div className="w-28 h-28 bg-gradient-to-b from-fuchsia-600 to-blue-700 rounded-br-full"></div>

          <div className="absolute top-0 left-16 w-24 h-16 bg-purple-200 rounded-b-full opacity-70"></div>

        </div>





        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 z-50 text-2xl text-black cursor-pointer"
        >
          <IoClose />
        </button>





        {/* CONTENT */}
        <div className="px-10 py-12 relative z-10">

          {/* TITLE */}
          <h2 className="text-3xl font-bold text-center mb-10">
            Add Company
          </h2>





          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* COMPANY NAME */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">
                Company Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter company name"
                className="w-full border border-gray-200 rounded px-4 py-2.5 outline-none focus:border-purple-500"
                required
              />
            </div>





            {/* LOCATION */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                className="w-full border border-gray-200 rounded px-4 py-2.5 outline-none focus:border-purple-500"
                required
              />
            </div>





            {/* CITY */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                className="w-full border border-gray-200 rounded px-4 py-2.5 outline-none focus:border-purple-500"
                required
              />
            </div>





            {/* FOUNDED ON */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">
                Founded On
              </label>

              <input
                type="date"
                name="foundedOn"
                value={formData.foundedOn}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded px-4 py-2.5 outline-none focus:border-purple-500"
                required
              />
            </div>





            {/* LOGO */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">
                Logo URL
              </label>

              {/* <input
                type="text"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                placeholder="Paste logo URL"
                className="w-full border border-gray-200 rounded px-4 py-2.5 outline-none focus:border-purple-500"
              /> */}
              <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setFormData({
      ...formData,
      logo: e.target.files[0],
    })
  }
  className="w-full border border-gray-200 rounded px-4 py-2.5 outline-none focus:border-purple-500"
/>
            </div>





            {/* DESCRIPTION */}
            <div>
              <label className="text-sm text-gray-500 block mb-2">
                Description
              </label>

              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter company description"
                className="w-full border border-gray-200 rounded px-4 py-3 outline-none resize-none focus:border-purple-500"
              />
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

export default AddCompanyModal;
