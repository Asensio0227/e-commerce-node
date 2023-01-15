const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
}

const getAllProducts = async (req, res) => {
  const products = await Product.find({})
    .populate("reviews");
  res.status(StatusCodes.OK).json({ products, count: products.length });
}

const getSingleProduct = async (req, res) => {
  const { id: userId } = req.params;
  const product = await Product.findOne({ _id: userId });
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${userId}`)
  }
  res.status(StatusCodes.OK).json({ product });
}

const updateProduct = async (req, res) => {
  const { id: userId } = req.params;
  const product = await Product.findOneAndUpdate(
    { _id: userId },
    req.body,
    {
      new: true,
      runValidators: true
    });
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${userId}`)
  }
  res.status(StatusCodes.OK).json({product, msg: "product updated successfully!" });
}

const deleteProduct = async (req, res) => {
  const { id: userId } = req.params;
  const product = await Product.findOne({ _id: userId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${userId}`)
  }

  await product.remove();

  res.status(StatusCodes.OK).json({product, msg: "product deleted successfully!" });
}

const uploadImage = async (req, res) => {
  // console.log(req.files);
  if (!req.files) {
    throw new CustomError.BadRequestError("No file uploaded")
  }

  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError("Please upload image ")
  }

  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError("Please upload image smaller than 1MB")
  }

  const imagePath = path.join(__dirname, "../public/uploads/" + `${productImage.name}`);
  await productImage.mv(imagePath);
  
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` }); 
}

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};