import API from "../api/axios";



// GET ALL COMPANIES
export const getCompaniesAPI = async ({
  search = "",
  city = "",
  sort = "",
}) => {

  const response = await API.get(
    `/companies?search=${search}&city=${city}&sort=${sort}`
  );

  return response.data;
};


// CREATE COMPANY
export const createCompanyAPI =
  async (data) => {

    const response =
      await API.post(
        "/companies",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
};