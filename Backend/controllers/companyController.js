import Company from "../models/Company.js";
import cloudinary from "../config/cloudinary.js";

// CREATE COMPANY
export const createCompany = async (
  req,
  res
) => {
  try {
    const {
      name,
      location,
      city,
      foundedOn,
      description,
    } = req.body;




    // VALIDATION
    if (
      !name ||
      !location ||
      !city ||
      !foundedOn
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All required fields are mandatory",
      });
    }




    // IMAGE URL
    let logoUrl = "";




    // IF IMAGE EXISTS
    if (req.file) {

      // CONVERT BUFFER TO BASE64
      const fileBase64 =
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;




      // UPLOAD TO CLOUDINARY
      const uploadedImage =
        await cloudinary.uploader.upload(
          fileBase64,
          {
            folder: "companies",
          }
        );




      logoUrl =
        uploadedImage.secure_url;
    }




    // CREATE COMPANY
    const company =
      await Company.create({
        name,
        location,
        city,
        foundedOn,
        description,
        logo: logoUrl,
      });




    return res.status(201).json({
      success: true,
      message:
        "Company created successfully",
      data: company,
    });

  } catch (error) {
    console.log(
      "Create Company Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Internal server error",
    });
  }
};
// export const createCompany = async (req, res) => {
//   try {
//     const {
//       name,
//       location,
//       city,
//       foundedOn,
//       logo,
//       description,
//     } = req.body;

//     // validation
//     if (!name || !location || !city || !foundedOn) {
//       return res.status(400).json({
//         success: false,
//         message: "All required fields are mandatory",
//       });
//     }

//     // create company
//     const company = await Company.create({
//       name,
//       location,
//       city,
//       foundedOn,
//       logo,
//       description,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Company created successfully",
//       data: company,
//     });
//   } catch (error) {
//     console.log("Create Company Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };



// GET ALL COMPANIES
export const getCompanies = async (req, res) => {
  try {
    const {
      search,
      city,
      sort,
    } = req.query;

    let filter = {};



    // SEARCH
    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          city: {
            $regex: search,
            $options: "i",
          },
        },

        {
          location: {
            $regex: search,
            $options: "i",
          },
        },

        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }



    // CITY FILTER
    if (city) {
      filter.city = city;
    }



    // SORTING
    let sortOption = {
      createdAt: -1,
    };

    if (sort === "name") {
      sortOption = {
        name: 1,
      };
    }

    if (sort === "rating") {
      sortOption = {
        averageRating: -1,
      };
    }

    if (sort === "location") {
      sortOption = {
        city: 1,
      };
    }



    const companies =
      await Company.find(filter).sort(
        sortOption
      );



    return res.status(200).json({
      success: true,
      total: companies.length,
      data: companies,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
// export const getCompanies = async (req, res) => {
//   try {
//     const { search } = req.query;

//     let filter = {};

//     // search functionality
//     if (search) {
//       filter.name = {
//         $regex: search,
//         $options: "i",
//       };
//     }

//     const companies = await Company.find(filter).sort({
//       createdAt: -1,
//     });

//     return res.status(200).json({
//       success: true,
//       total: companies.length,
//       data: companies,
//     });
//   } catch (error) {
//     console.log("Get Companies Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };



// GET SINGLE COMPANY
export const getSingleCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.log("Get Single Company Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};