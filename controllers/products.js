const Product = require("../model/productModel");

//Get all Products : Includes - Sorting, Select, Name Regex, Pagination.
const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};
  if (company) {
    queryObject.company = company;
  }
  if (featured) {
    queryObject.featured = featured;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  let apiData = Product.find(queryObject);
  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }
  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 3;
  let skip = (page - 1) * limit;

  apiData.skip(skip).limit(limit);
  const productData = await apiData;
  res.status(200).json({ productData });
};

const addNewProduct = async (req, res) => {
  const { name } = req.body;
  try {
    let existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).send("Product already registered.");
    }
    const newProduct = new Product(req.body);
    newProduct
      .save()
      .then(() => {
        console.log("Success");
        res.status(200).json({ msg: "New Product Added", input: req.body });
      })
      .catch((error) => {
        console.log(`Error ${error}`);
        res.status(403).json({ error: error });
      });
  } catch (error) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports = { getAllProducts, addNewProduct };
